<div>
  <img align="left" src="assets/logo.png" width="175" alt="logo" />
  <h1 align="left">Swarmlet</h1>
</div>

**[Website](https://swarmlet.dev)** — **[Documentation](https://swarmlet.dev/docs)** — **[Demo 🧞‍♂](https://vimeo.com/412918465)**

Swarmlet is a self-hosted, open-source Platform as a Service that runs on any single server. It's mainly intended for use with multiple servers, a server cluster / swarm. Heavily inspired by **[Dokku](https://dokku.com/)**.

---

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/contributions-welcome!-brightgreen.svg?style=flat-square)

### NOTE

Work In Progress.  
This project is in beta and definitely not production-ready yet.

- Project boards: https://github.com/orgs/swarmlet/projects
- Join us on Slack: https://join.slack.com/t/swarmlet/shared_invite/zt-eki9qa53-9FdvUik604rncp61dbawkQ

### _TL;DR_

Why choose Kubernetes over Docker + Docker Swarm?  
Why not automate some deployment things to get a pretty simple, versatile and solid setup?  
Bonus, you're familiar with Docker already.

How:  
Install `swarmlet` on a server. Develop projects locally as usual, add a `docker-compose.yml` file to describe your application stack, add a git remote, e.g. [`git remote add swarm git@my-swarm:my-project`](https://swarmlet.dev/docs/getting-started/ssh-key-setup).  
Then simply `git push swarm master` to deploy the project on your swarm (server cluster). A load balancer, SSL, and metrics/logging (optional) are enabled by default.

## What is Swarmlet?

Swarmlet is a thin wrapper around [Docker Compose](https://docs.docker.com/compose/) and [Docker Swarm mode](https://docs.docker.com/engine/swarm/).  
A few core services, [Traefik](https://github.com/containous/traefik) (v2.3), [Let's Encrypt](https://letsencrypt.org), [Ansible](https://www.ansible.com/) and [GlusterFS](https://www.gluster.org/) are included by default.  
These enable automatic SSL, load balancing, swarm state management and distributed file storage.  
Let's Encrypt wildcard certificates support - [more info](https://doc.traefik.io/traefik/https/acme/#wildcard-domains).

During the installation you can choose to install [Matamo](https://matomo.org/), [Portainer](https://www.portainer.io/), [Swarmpit](https://swarmpit.io) and [Swarmprom](https://github.com/stefanprodan/swarmprom).  
These optional services are included to provide analytics and various metrics dashboards.

This project is aimed at developers that want to experiment with application deployment in a flexible multi-server / high-availability environment. The goal is to be able to set up your own swarm and deploy your app(s) in minutes.

## Getting started

1. Install Swarmlet on a new VPS running Ubuntu 18.04 x64 as root.
1. [Edit your local SSH config](https://swarmlet.dev/docs/getting-started/ssh-key-setup) to use `ssh swarm` instead of `ssh root@123.23.12.123`
1. Use an existing project, or clone one of the [examples](https://swarmlet.dev/docs/examples/static-site)
1. Add a [`docker-compose.yml`](https://swarmlet.dev/docs/getting-started/deploying-applications) file in the root of your project
1. Add a git remote: [`git remote add swarm git@swarm:my-project`](https://swarmlet.dev/docs/getting-started/ssh-key-setup)
1. Deploy your application stack to the swarm using `git push swarm master`

> [Example application setup and deployment guide](https://swarmlet.dev/docs/getting-started/deploying-applications#example-app-setup)

## Installation

Make sure you have a (sub) domain available which is pointed to your server, this is necessary to access the Traefik or Portainer/Matomo dashboards located at e.g. `portainer.your-domain.com`.

To install the latest version of Swarmlet, log in to your server as root and run:

```shell
curl -fsSL https://get.swarmlet.dev | bash
```

The installation should take a few minutes to complete.

> [Full installation instructions can be found here](https://swarmlet.dev/docs/getting-started/installation)

### Custom installation

```shell
# Headless (noninteractive) installation:
curl -fsSL https://get.swarmlet.dev | bash -s \
  INSTALLATION_TYPE=noninteractive \
  INSTALL_ZSH=true \
  INSTALL_MODULES="matomo swarmpit" \
  NEW_HOSTNAME=swarm-manager-1 \
  SWARMLET_USERNAME=admin \
  SWARMLET_PASSWORD=nicepassword \
  ROOT_DOMAIN=dev.mydomain.com
```

## Examples

Swarmlet includes various examples of services that you can deploy to your server cluster with a simple `git push`.

- [swarmlet-website - The swarmlet.dev website](https://github.com/swarmlet/swarmlet-website)
- [get-swarmlet - The get.swarmlet.dev install script](https://github.com/swarmlet/swarmlet/tree/master/examples)
- [Basic example - Static site](https://github.com/swarmlet/swarmlet/tree/master/examples)
- [Basic example - Python web server + Redis](https://github.com/swarmlet/swarmlet/tree/master/examples)
- [Moderate example - NGINX + React app + Node.js API](https://github.com/swarmlet/swarmlet/tree/master/examples)
- (FIX) [Advanced example - NGINX + React app + Node.js API + CMS + staging/production](https://github.com/swarmlet/swarmlet/tree/master/examples)
- (FIX) [GitLab CE](https://github.com/swarmlet/swarmlet/tree/master/examples) (self-hosted)
- (FIX) [GitLab Runner](https://github.com/swarmlet/swarmlet/tree/master/examples) (self-hosted)

All these examples and the [Swarmlet documentation and website](https://swarmlet.dev) are running on a €5/mo _single_ server 'cluster', using Swarmlet for deployments.

---

[![Proudly sponsored by Passionate People](https://passionatepeople.io/image/sponsor/sponsored-by-normal-small.png)](https://passionatepeople.io/oss)
