---
id: swarmlet-and-docker-compose
title: Swarmlet and Docker Compose
custom_edit_url: null
---

https://docs.traefik.io/v1.7/configuration/backends/docker/

## Deployments with Swarmlet
After receiving the new or updated repository from a user `git push`, `swarmlet` will run these steps in following order:
- Receive updated repository triggers the `/var/repo/my-app.git/hooks/post-receive` hook
- Clone or the repository contents from `/var/repo/my-app.git` to `/home/git/my-app` and set folder permissions
- Run the `deployments` service, this is a service used by Swarmlet to handle application deployments.
  - Look for optional `.env` and `entrypoint` files and load/execute them to set up environment variables and/or run scripts before actual deployment
  - Run `docker-compose build --parallel` to build the stack (if a service uses a `Dockerfile`)
  - Run `docker-compose push` to push images to the specified registry. Swarmlet uses a local registry to store Docker images, use `${SWARMLET_REGISTRY}` to store your image to the local registry.
  - Run `docker stack deploy --compose-file $COMPOSE_FILE $REPO_NAME` to deploy the application stack to the swarm
