---
id: introduction
title: Introduction
sidebar_label: Introduction
custom_edit_url: null
---

## What is Swarmlet?
Swarmlet is a self-hosted, open-source Platform as a Service that runs on any single server - but is intended for use with multiple servers, a server cluster / swarm.

Swarmlet is a thin wrapper around [Docker Swarm mode](https://docs.docker.com/engine/swarm/). Heavily inspired by [Dokku](http://dokku.viewdocs.io/dokku/)!  
[Traefik](https://github.com/containous/traefik), [Let's Encrypt](https://letsencrypt.org), [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom) are included by default.  
Swarmlet uses these to provide automatic SSL, load balancing and various metrics dashboards.  

This project is aimed at developers that want to learn about or experiment with application deployment in a flexible multi-server / high-availability environment. The goal is to be able to set up your own swarm and deploy your app(s) in minutes.  

The project repository can be found at [https://github.com/woudsma/swarmlet](https://github.com/woudsma/swarmlet)

#### A simple development workflow with Swarmlet looks like this:
- Develop your project locally
- Add a `docker-compose.yml` file in the root of your project.
- Add a git remote: `git remote add swarm git@my-swarm:my-project`
- Deploy your application (stack) to the swarm using `git push swarm master`
- SSL certificates for frontend services are generated automatically by the built-in load balancer

## Installation
**Requirements**: Bash 4.0 or higher (run `bash --version`).  

**[Full installation instructions can be found here](/docs/getting-started/installation)**  

To install the latest version of Swarmlet, log in to your server as root and run:  
```shell
# Quick installation:
curl -fsSL https://get.swarmlet.dev | bash
```
```shell
# Custom installation 
curl -fsSL https://get.swarmlet.dev | bash -s \
  SWARMLET_DOMAIN=dev.mydomain.com \
  CREATE_SWAP=true \
  SKIP_SWARMPROM=true
```
The installation should take a few minutes to complete.  

## SSH configuration
Assuming you've already added your SSH key to `/root/.ssh/authorized_keys` on your server, consider adding a `Host` entry to your local `~/.ssh/config` file:
```yaml
Host swarm
    HostName 123.23.12.123
    User root
    IdentityFile ~/.ssh/id_rsa_swarm # Optional
```
Now `ssh root@123.23.12.123` becomes `ssh swarm`.  

*(Optional)* Create a SSH key specifically for use with the swarm.
```shell
# Create SSH key
ssh-keygen -f ~/.ssh/id_rsa_swarm -t rsa -N '' -C "your@email.com"
# Copy key to server
ssh-copy-id -i ~/.ssh/id_rsa_swarm swarm
```

## Deploying an application on your swarm
- Use an existing project, or create a new project based on one of the [examples](/docs/getting-started/deploying-applications#example-application-setup)
- Add a git remote to your local project using `git remote add swarm git@swarm:my-app`
- Commit your files: `git add . && git commit -m 'initial'`
- Push to the swarm repository: `git push swarm master`
- Wait for Traefik to update it's configuration and visit your app at [https://my-app.mydomain.com]()

## Configuration
Configure Swarmlet during installation by specifying installation options as described [here](/docs/getting-started/installation).  
Alternatively, configure Swarmlet using the `swarmlet config` command. For example:
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
- [HAProxy]() (Replacing Traefik with HAProxy)
