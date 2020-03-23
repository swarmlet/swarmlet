---
id: introduction
title: Introduction
sidebar_label: Introduction
---

## What is Swarmlet?
Swarmlet is a self-hosted, open-source Platform as a Service that runs on any single server - but is intended for use with multiple servers, a server cluster.

Swarmlet is a thin wrapper around [Docker Swarm mode](https://docs.docker.com/engine/swarm/). Heavily inspired by [Dokku](http://dokku.viewdocs.io/dokku/).  
[Traefik](https://github.com/containous/traefik), [Let's Encrypt](https://letsencrypt.org), [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom) are included by default.  

This project is aimed at developers that want to learn about or experiment with application deployment in a flexible multi-server environment. The goal is to be able to set up your own swarm (server cluster) and deploy your app in minutes.  

The project repository can be found at [https://github.com/woudsma/swarmlet](https://github.com/woudsma/swarmlet)

##### A simple development workflow with Swarmlet looks like this:
- Develop your project locally
- Add a `docker-compose.yml` file in the root of your project.
- Add a git remote: `git remote add swarm git@my-swarm:my-project`
- Deploy your application (stack) to the swarm using `git push swarm master`
- SSL certificates are generated automatically by the built-in load balancer for services exposed to the web

##### Checking the status of your swarm nodes and applications
- Include a domain in the installation options or add a domain to the Swarmlet configuration using e.g.`swarmlet config:set SWARMLET_DOMAIN=dev.mydomain.com`
- Visit the Swarmpit dashboard at [swarmpit.dev.mydomain.com](), or any of the [other pre-installed metrics dashboards](/docs/getting-started/metrics-and-dashboards)

## Installation
**Required**: Bash 4.0 or higher (run `bash --version`).  

To install the latest version of Swarmlet, log in to your server as root and run:  
```shell
# Quick installation:
curl -fsSL https://get.swarmlet.dev | bash
```
The installation should take a few minutes to complete.  
Custom installation instructions can be found [here](/docs/getting-started/installation):
```shell
# Custom installation 
curl -fsSL https://get.swarmlet.dev | bash -s \
  SWARMLET_DOMAIN=dev.mydomain.com \
  CREATE_SWAP=true \
  SKIP_SWARMPROM=true
```

## Configuration
Configure Swarmlet during installation by specifying installation options as described [here](/docs/getting-started/installation).  
Alternatively, configure swarmlet using the `swarmlet config` command. For example:
```shell
swarmlet config:set SWARMLET_DOMAIN=dev.mydomain.com
```

## Examples

Swarmlet includes various examples of services that you can deploy to your server cluster with a simple `git push`.  
- [Basic example - Static site]()
- [Basic example - Python web server + Redis]()
- [Moderate example - NGINX + React app + Node.js API]()
- [Advanced example - NGINX + React app + Node.js API + CMS + staging/production]()
- [get-swarmlet]() (the app serving the Swarmlet install script at [get.swarmlet.dev](https://get.swarmlet.dev))
- [GitLab CE]() (self-hosted)
- [GitLab Runner]() (self-hosted)
- [HAProxy]() (Replace Traefik with HAProxy)
