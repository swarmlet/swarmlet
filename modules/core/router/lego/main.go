package main

import (
	"fmt"
	"os"
	"sync"

	docker "github.com/fsouza/go-dockerclient"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	fmt.Println("Swarmlet Lego daemon")
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
					for k, v := range service.Spec.Labels {
						fmt.Printf("%s -> %s\n", k, v)
						if k == "swarmlet.domains" {
							fmt.Println("Running lego for domains " + v)
							// TODO: Call lego here
							// TODO: Inject Traefik TLS labels into service
						}
					}
				}
			}
		} else {
			err := fmt.Errorf("Event channel closed, is docker.sock dead?")
			check(err)
			return
		}
	}
}
