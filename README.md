<div>
  <img align="left" src="assets/logo-small.jpg" width="175" alt="logo" />
  <h1 align="left">Swarmlet</h1>
</div>

A small tool to manage swarm deployments, load balancing, SSL, metrics and more.  
Swarmlet is a thin wrapper around [Docker Swarm mode](https://docs.docker.com/engine/swarm/). Heavily inspired by [Dokku](http://dokku.viewdocs.io/dokku/).  
[Traefik](https://github.com/containous/traefik), [Let's Encrypt](https://letsencrypt.org), [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom) are included by default. Written in Bash.  

---

- **[Website](https://swarmlet.dev/docs/doc1)**  
- **[Documentation](https://swarmlet.dev/docs/doc1)**  

***TLDR;*** Install `swarmlet` on a server. Develop projects locally, describe your project application stack in a `docker-compose.yml` file and simply `git push swarm master` to deploy the project on your swarm (server cluster). A load balancer, SSL, and metrics/logging are enabled by default.  

```sh
# Quick install (see below for install with options)
curl -fsSL https://get.swarmlet.dev | bash
```

## Introduction
Swarmlet tries to make it as easy as possible to deploy applications on your server cluster. The idea is to define your application stack in a `docker-compose.yml` file, including domain name configuration for each service. Swarmlet handles deployment and sets up SSL certificates automatically. Also, it's 100% open-source, highly configurable and self-hosted.

### Example workflow for a server cluster with a single node:  
1. Install `swarmlet` as root on a manager node.  
This can be an empty server without Docker installed for example. You only need `curl`.  
2. Create a repository on the swarm using `swarmlet repo:create my-app`. [[info]](#swarm-repositories)
3. Add a git remote to your project using `git remote add swarm git@swarm:my-app`. [[info]](#setting-up-remotes)
4. Describe your project in a `docker-compose.yml` file.
5. Done! -> `git push swarm master`.

### Example workflow for a server cluster with multiple nodes
1. Follow the instructions for a single node setup.
2. Add additional manager/worker nodes to the swarm using `swarmlet node:join <node-ip>`. [[info]](#join-nodes)

Create new repository: `swarmlet repo:create hello-universe`.  
Remove repository: `swarmlet repo:remove hello-universe`.  
List all services and containers: `swarmlet ls`.  

---

### Automatic load balancing and SSL
Swarmlet uses Traefik and Let's Encrypt by default. These can be configured by editing the `docker-compose.yml` file of the `traefik` application stack, which can simply be cloned from your swarm registry using `git clone git@swarm:traefik` and redeployed using `git push swarm master`. Traefik uses [Consul](https://www.consul.io) as it's internal key-value store.  
The Traefik and Consul dashboards are available on the following domains:
```sh
https://traefik.example.com
https://consul.example.com
```

### Metrics and logging
Metrics and logging are enabled by default. Swarmlet includes [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom), which are accessible on the following domains:
```sh
# Swarmpit
https://swarmpit.example.com

# Swarmprom
https://grafana.example.com
https://alertmanager.example.com
https://unsee.example.com
https://prometheus.example.com
```

---

## Installation
On the server:
```sh
# Quick install
curl -fsSL https://get.swarmlet.dev | bash

# Install with options:
OPTIONS=(
  DEBUG=true  # (default false)
  # SKIP_SWAP=true  # (default false) Don't allocate 1GB swap
  SKIP_METRICS=true  # (default false) Skip installation of Swarmpit and Swarmprom
  # SKIP_SWARMPIT=true  # (default false) Skip installation of Swarmpit
  # SKIP_SWARMPROM=true  # (default false) Skip installation of Swarmprom
)

curl -fsSL https://get.swarmlet.dev | bash -s "${OPTIONS[@]}"
```

### SSH configuration
*(Recommended)* Add a `Host` entry in `~/.ssh/config` to easily connect using `ssh swarm`. [[info]](#ssh-config)  
```
Host swarm
    HostName 123.23.12.123
    User root
    IdentityFile ~/.ssh/id_rsa_swarm
```
Now `ssh -i ~/.ssh/id_rsa_swarm root@123.23.12.123` becomes `ssh swarm`.  

### Services configuration
To configure the built-in services such as swarmpit/traefik/registry, simply pull the `swarmlet-services` repo from your swarm. Edit the service `docker-compose.yml` file and push the changes using `git push origin master`.
```sh
# Clone the 'services' repository
git clone git@swarm:swarmlet-services 
cd swarmlet-services
# Edit configuration..
git add .
git commit -m 'update configuration'
git push origin master
```

## Commands
```sh
swarmlet init  # This command executes automatically on initial installation
               # Installs dependencies (git, docker, docker-compose)
               # Installs services (deployments, traefik, metrics)
               # Creates the 'git' user who manages git repositories
               # Enables git push to the server using git@<server>:<app>

swarmlet repo:list             # Lists repositories stored in the swarm
swarmlet repo:create <name>    # Creates a bare git repository where you can push to
swarmlet repo:remove <name>    # Removes repository from the swarm
                               # Note that this does not stop any running containers

swarmlet stack:list            # Lists stacks
swarmlet stack:build <name>    # Deploys repository as application stack in the swarm
                               # Make sure your repository includes a docker-compose.yml file
swarmlet stack:deploy <name>   # Remove stack, stop running containers and unmount volumes
swarmlet stack:start <name>    # Start stopped stack
swarmlet stack:restart <name>  # Start stopped stack
swarmlet stack:stop <name>     # Stop running stack
```

## Setting custom headers  
To add custom headers to one of your apps, add some labels in your project's `docker-compose.yml`.  
Traefik will pass these headers to your application.  
See [using security headers](https://docs.traefik.io/middlewares/headers/#using-security-headers).
```yml
# Custom headers example
labels:
  - "traefik.http.middlewares.testHeader.headers.customrequestheaders.X-Script-Name=test"
  - "traefik.http.middlewares.testHeader.headers.customresponseheaders.X-Custom-Response-Header=value"

# CORS example
labels:
  - "traefik.http.middlewares.testheader.headers.accesscontrolallowmethods=GET,OPTIONS,PUT"
  - "traefik.http.middlewares.testheader.headers.accesscontrolalloworigin=origin-list-or-null"
  - "traefik.http.middlewares.testheader.headers.accesscontrolmaxage=100"
  - "traefik.http.middlewares.testheader.headers.addvaryheader=true"
```

## Examples
This is an example of an entire application stack described in a single docker-compose.yml file. Domains and subdomains should be described in here as well. Traefik will issue SSL certificates automatically using Let's Encrypt if port 443 is specified on a service.
```sh
# .env
DOMAIN=example.com
```
```yml
# NOTE: include labels by default?
version: '3.7'

services:
  web-2:
    image: hashicorp/http-echo
    command: ["-text", "Hello World.."]
    deploy:
      replicas: 1
      labels:
        # Specify the (sub) domain(s) for this service
        - traefik.frontend.rule=Host:echo.${DOMAIN}
        # The service port Traefik will expose to ${DOMAIN}:80 (and ${DOMAIN}:443)
        - traefik.port=5678
        - traefik.enable=true
        - traefik.tags=traefik-public
        - traefik.docker.network=traefik-public
        - traefik.redirectorservice.frontend.entryPoints=http
        - traefik.redirectorservice.frontend.redirect.entryPoint=https
        - traefik.webservice.frontend.entryPoints=https
    networks:
      - traefik-public
  
networks:
  traefik-public:
    external: true
```

## Use swarm node as GitLab Runner
...
