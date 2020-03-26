---
id: introduction
title: Introduction
sidebar_label: Introduction
custom_edit_url: null
---

## What is Swarmlet?
Swarmlet is a self-hosted, open-source Platform as a Service that runs on any single server.  
It's mainly intended for use with multiple servers, a server cluster / swarm.  
Heavily inspired by **[Dokku](http://dokku.viewdocs.io/dokku/)**.  

Swarmlet is a thin wrapper around [Docker Compose](https://docs.docker.com/compose/) and [Docker Swarm mode](https://docs.docker.com/engine/swarm/).  
[Traefik](https://github.com/containous/traefik), [Let's Encrypt](https://letsencrypt.org), [Matamo](https://matomo.org/), [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom) are included by default.  
Swarmlet uses these to provide automatic SSL, load balancing, analytics and various metrics dashboards.  

This project is aimed at developers that want to experiment with application deployment in a flexible multi-server / high-availability environment. The goal is to be able to set up your own swarm and deploy your app(s) in minutes.  

The project GitHub repository can be found at [https://github.com/woudsma/swarmlet](https://github.com/woudsma/swarmlet)  

## Motivation

Imagine you want to host multiple applications, websites, API services, databases and workers on your VPS (Virtual Private Server). [Docker](https://www.docker.com/101-tutorial) makes it possible to wrap each application in it's own container so it can be deployed anywhere. A tool like [Dokku](http://dokku.viewdocs.io/dokku/) does a very good job at managing and building these containers on a VPS and having multiple web applications running on the same server. Dokku can manage virtual hosts, enable SSL using Let's Encrypt, handle environment variable injection, etc. And most importantly, Dokku makes it possible to deploy  apps to your server with a simple `git push`.  
Quite amazing.  

Now there comes a time when we have 25+ applications running on our single host. Disk space starts becoming an issue, anxiety intensifies about the server going down, you wake up in the middle of the night mumbling *"Ephemeral Application Container Orchestration and Continuous Delivery on Highly-Availabile Server Clusters"* and the creeping thought of running a personal server cluster seems to be growing stronger by the day.  

> *"But what about resource allocation in a distributed system?"*  
*"And which server is running my application container?"*  
*"What happens when a server running my website container crashes?"*  
*"Where will my SSL certificates be stored in a swarm with 3 nodes?"*  

Questions, doubt.. We could just ramp up the server resources a.k.a. [scaling vertically](https://stackoverflow.com/questions/11707879/difference-between-scaling-horizontally-and-vertically-for-databases). Adding more processing power, disk space or increasing memory. *(downtime..)* - However, the itching thought of running a multi server setup just feels like the right thing to do. Ok, so what are the options? Everyone is talking about [Kubernetes](https://learnk8s.io/troubleshooting-deployments), a bit much to start with maybe. The [k3s](https://k3s.io/) project looks interesting but since it's based on Kubernetes the learning curve is still quite steep. Since we're using `Dockerfile`'s and `docker-compose.yml` files in our projects already, let's try to stay close to Docker. It would be nice to stay *very* close to Docker for maximal compatibility. It would also be nice to be able to define our entire application stack, including domains, deployment strategies, networking and persistent storage for our ephemeral / stateless applications in a single file. Also we want to be able to `git push` our local project repository to our cluster to deploy **and** have SSL certificates issued automatically for our web facing services. You're probably using Docker Compose already, so let's combine Git, Docker Swarm mode and Docker Compose to deploy applications to a flexible *(cheap)* personal server cluster.  

## Getting started
1. Create a new VPS running Ubuntu 18.04 x64 and log in as root
1. Install Swarmlet (optionally [with some swap]() if your server has less than 2gb of memory)
1. [Edit your SSH config]() to be able to use `ssh swarm` instead of `ssh root@123.23.12.123`
1. Use an existing project, or clone one of the [examples](/docs/examples/static-site)
1. Add a `docker-compose.yml` file in the root of your project: [example docker-compose.yml](https://github.com/woudsma/swarmlet/blob/master/examples/basic-example/docker-compose.yml)
1. Add a git remote: `git remote add swarm git@swarm:my-project`  
(notice the syntax `git@<name-configured-in-ssh-config>:<project-name>`)
1. Deploy your application stack to the swarm using `git push swarm master`
1. SSL certificates for web facing services are generated automatically using Let's Encrypt  
(assuming you've assigned a domain to your server in your DNS configuration)

**[Example application setup and deployment guide](/docs/getting-started/deploying-applications#example-application-setup)**

## Installation
**Requirements**: Bash 4.0 or higher (run `bash --version`).  

**[Full installation instructions can be found here](/docs/getting-started/installation)**  
To install the latest version of Swarmlet, log in to your server as root and run:  
```shell
# Quick installation:
curl -fsSL https://get.swarmlet.dev | bash
```
Or with [options](/docs/getting-started/installation):
```shell
# Custom installation 
curl -fsSL https://get.swarmlet.dev | bash -s \
  SWARMLET_DOMAIN=dev.mydomain.com \
  CREATE_SWAP=true \
  SKIP_SWARMPROM=true
```
The installation should take a few minutes to complete.  

## Examples

Swarmlet includes various examples of services that you can deploy to your server cluster with a simple `git push`.  
- [Basic example - Static site](/docs/examples/static-site)
- [Basic example - Python web server + Redis](/docs/examples/python-redis)
- [Moderate example - NGINX + React app + Node.js API](/docs/examples/nginx-react-node)
- [Advanced example - NGINX + React app + Node.js API + CMS + staging/production](/docs/examples/nginx-react-node-cms)
- [get-swarmlet](/docs/examples/get-swarmlet) (the app serving the Swarmlet install script at [get.swarmlet.dev](https://get.swarmlet.dev))
- [GitLab CE](/docs/examples/gitlab-ce) (self-hosted)
- [GitLab Runner](/docs/examples/gitlab-runner) (self-hosted)
- [HAProxy](/docs/examples/haproxy) (Replacing Traefik with HAProxy)
