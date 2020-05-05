<div>
  <img align="left" src="assets/logo.png" width="175" alt="logo" />
  <h1 align="left">Swarmlet</h1>
</div>

**[Website](https://swarmlet.dev)** — **[Documentation](https://swarmlet.dev/docs/getting-started/introduction)** — **[Demo 🧞‍♂](https://vimeo.com/412918465)**  

Swarmlet is a self-hosted, open-source Platform as a Service that runs on any single server.  
It's mainly intended for use with multiple servers, a server cluster / swarm.  
Heavily inspired by **[Dokku](http://dokku.viewdocs.io/dokku/)**.  

---

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)
![contributions-welcome](https://img.shields.io/badge/contributions-welcome-blue.svg)

### NOTE  
Work In Progress.  
This project is in beta and definitely not production-ready yet.
Current todo's:  
[https://github.com/swarmlet/swarmlet/issues](https://github.com/swarmlet/swarmlet/issues)


### *TL;DR*  
Install `swarmlet` on a server. Develop projects locally, describe your project application stack in a `docker-compose.yml` file and simply `git push swarm master` to deploy the project on your swarm (server cluster). A load balancer, SSL, and metrics/logging are enabled by default.  

## What is Swarmlet?
Swarmlet is a thin wrapper around [Docker Compose](https://docs.docker.com/compose/) and [Docker Swarm mode](https://docs.docker.com/engine/swarm/).  
[Traefik](https://github.com/containous/traefik), [Let's Encrypt](https://letsencrypt.org), [Matamo](https://matomo.org/), [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom) are included by default.  
Swarmlet uses these to provide automatic SSL, load balancing, analytics and various metrics dashboards.  

This project is aimed at developers that want to experiment with application deployment in a flexible multi-server / high-availability environment. The goal is to be able to set up your own swarm and deploy your app(s) in minutes.  

## Getting started
1. Create a new VPS running Ubuntu 18.04 x64 and log in as root
1. Set the hostname
1. Install Swarmlet (optionally [with some swap]() if your server has less than 2gb of memory)
1. [Edit your SSH config]() to be able to use `ssh swarm` instead of `ssh root@123.23.12.123`
1. Use an existing project, or clone one of the [examples](https://swarmlet.dev/docs/examples/static-site)
1. Add a `docker-compose.yml` file in the root of your project: [example docker-compose.yml](https://github.com/swarmlet/swarmlet/blob/master/examples/basic-example/docker-compose.yml)
1. Add a git remote: `git remote add swarm git@swarm:my-project`  
(notice the syntax `git@<name-configured-in-ssh-config>:<project-name>`)
1. Deploy your application stack to the swarm using `git push swarm master`
1. SSL certificates for web facing services are generated automatically using Let's Encrypt  
(assuming you've assigned a domain to your server in your DNS configuration)

**[Example application setup and deployment guide](https://swarmlet.dev/docs/getting-started/deploying-applications#example-application-setup)**

## Installation
**Requirements**: Bash 4.0 or higher (run `bash --version`).  

**[Full installation instructions can be found here](https://swarmlet.dev/docs/getting-started/installation)**  
To install the latest version of Swarmlet, log in to your server as root and run:  
```shell
# Quick installation:
curl -fsSL https://get.swarmlet.dev | bash
```
Or with [options](https://swarmlet.dev/docs/getting-started/installation):
```shell
# Custom installation 

# THIS DOES NOT WORK YET

# curl -fsSL https://get.swarmlet.dev | bash -s \
#   SWARMLET_DOMAIN=dev.mydomain.com \
#   CREATE_SWAP=true \
#   SKIP_SWARMPROM=true
```
The installation should take a few minutes to complete.  

## Examples

Swarmlet includes various examples of services that you can deploy to your server cluster with a simple `git push`.  
- [Basic example - Static site](https://swarmlet.dev/docs/examples/static-site)
- [Basic example - Python web server + Redis](https://swarmlet.dev/docs/examples/python-redis)
- [Moderate example - NGINX + React app + Node.js API](https://swarmlet.dev/docs/examples/nginx-react-node)
- [FIX] [Advanced example - NGINX + React app + Node.js API + CMS + staging/production](https://swarmlet.dev/docs/examples/nginx-react-node-cms)
- [get-swarmlet](https://swarmlet.dev/docs/examples/get-swarmlet) (the app serving the Swarmlet install script at [get.swarmlet.dev](https://get.swarmlet.dev))
- [FIX] [GitLab CE](https://swarmlet.dev/docs/examples/gitlab-ce) (self-hosted)
- [FIX] [GitLab Runner](https://swarmlet.dev/docs/examples/gitlab-runner) (self-hosted)
- [TODO] [HAProxy](https://swarmlet.dev/docs/examples/haproxy) (Replacing Traefik with HAProxy)

All these examples and the [Swarmlet documentation and website](https://swarmlet.dev) are running on a €5/mo *single* server 'cluster', using Swarmlet for deployments.  

<!-- Services you can run on your swarm (replace swarmlet.dev with your domain and [update](https://swarmlet.dev/docs/getting-started/introduction) the service configuration):

[swarmlet.dev](https://swarmlet.dev)  
[swarmpit.swarmlet.dev](https://swarmpit.swarmlet.dev)  
[matomo.swarmlet.dev](https://matomo.swarmlet.dev)  
[grafana.swarmlet.dev](https://grafana.swarmlet.dev)  
[traefik.swarmlet.dev](https://traefik.swarmlet.dev)  
[consul.swarmlet.dev](https://consul.swarmlet.dev)  
[prometheus.swarmlet.dev](https://prometheus.swarmlet.dev)  
[alertmanager.swarmlet.dev](https://alertmanager.swarmlet.dev)  
[unsee.swarmlet.dev](https://unsee.swarmlet.dev)   -->

---

[![Proudly sponsored by Passionate People](https://passionatepeople.io/image/sponsor/sponsored-by-normal-small.png)](https://passionatepeople.io/oss)
