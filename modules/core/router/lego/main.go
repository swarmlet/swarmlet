package main

import (
	"fmt"
	"os"
	"os/exec"
	"sync"

	docker "github.com/fsouza/go-dockerclient"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

var legoOutputFolder = "/letsencrypt"

func main() {
	fmt.Println("Swarmlet Lego daemon")
	_, err := os.Stat("./lego")
	if err != nil {
		fmt.Println("Missing ./lego binary!")
	}
	path, err := os.Getwd()
	check(err)
	client, err := docker.NewClient("unix://" + path + "/docker.sock") // Use docker.sock from current folder (dev purposes only)
	check(err)
	listener := make(chan *docker.APIEvents)
	err = client.AddEventListener(listener)
	check(err)
	var wg sync.WaitGroup
	wg.Add(1)
	go eventHandler(listener, &wg, client)
	wg.Wait()
}

func eventHandler(event chan *docker.APIEvents, wg *sync.WaitGroup, client *docker.Client) {
	defer wg.Done()
	for {
		msg, more := <-event
		if more {
			if msg.Type == "service" /* && msg.Scope == "swarm" */ {
				if msg.Action == "update" {
					service, err := client.InspectService(msg.Actor.ID)
					check(err)
					fmt.Printf("Caught service update %v", msg.Actor.ID)
					for k, v := range service.Spec.Labels {
						fmt.Printf("%s -> %s\n", k, v)
					}
					domains, ok := service.Spec.Labels["swarmlet.lego.domains"]
					email, ok2 := service.Spec.Labels["swarmlet.lego.email"]
					_, isDone := service.Spec.Labels["swarmlet.lego._done"]
					// TODO: This is hardcoded for a staging environment
					acmeEndpoint := "https://acme-staging-v02.api.letsencrypt.org/directory"
					_, ok3 := service.Spec.Labels["swarmlet.lego.agreetos"]
					if ok && ok2 && ok3 && !isDone {
						// Run Lego
						legoCmd := exec.Command("./lego", "--path", legoOutputFolder, "-a", "--server", acmeEndpoint, "--email", email, "--domains", domains, "--http", "run")
						legoCmd.Stdout = os.Stdout
						legoCmd.Stderr = os.Stderr
						err := legoCmd.Run()
						if err != nil {
							fmt.Printf("Swarmlet Lego: Lego error %v", err)
							continue
						}
						serviceSpecMod := service.Spec

						// TODO: Inject Traefik labels
						serviceSpecMod.Labels["swarmlet.lego._done"] = "true"

						serviceOpts := docker.UpdateServiceOptions{
							ServiceSpec: serviceSpecMod,
							Version:     service.Version.Index,
						}
						err = client.UpdateService(msg.Actor.ID, serviceOpts)
						check(err)
					} else if isDone {
						fmt.Printf("Skipping post-lego Docker event (label swarmlet.lego._done is present)")
					} else {
						fmt.Printf("Skipping not applicable service")
					}
				}
			}
		} else {
			_, err := fmt.Printf("Event channel closed, is docker.sock dead?")
			check(err)
			return
		}
	}
}
