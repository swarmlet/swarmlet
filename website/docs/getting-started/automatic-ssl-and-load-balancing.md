---
id: automatic-ssl-and-load-balancing
title: Automatic SSL and load balancing
custom_edit_url: null
---

## Introduction
Because Swarmlet activates Docker Swarm mode, you can run your applications in 'highly available' Docker containers across your swarm. The application containers will be distributed on the swarm, this can be configured in your project `docker-compose.yml` file under the `deploy` key.  

### Traefik and Consul
![traefik diagram](/img/traefik-diagram.png)  

Swarmlet uses [Traefik](https://github.com/containous/traefik) for load balancing with [Consul](https://www.consul.io) as it's distributed certificate store. Traefik detects new applications and listens for any configuration updates.  
Traefik will attempt to generate a SSL certificate for each frontend service in your application stack using [Let's Encrypt](https://letsencrypt.org).  

Certificates are stored in Consul, which is a distributed key-value store. In the case where a swarm node goes offline, the certificates are still available from a Consul replica on another node.  

> *Note: Use the Let's Encrypt [staging environment](https://letsencrypt.org/docs/staging-environment/) to prevent exceeding the [rate limit](https://letsencrypt.org/docs/rate-limits/) while developing. [Traefik configuration](#traefik-configuration)*  

## Configuration
### Example project configuration
To enable load balancing on a service and expose it to the web, add the highlighted labels and networks to your frontend service(s):
```yml {8-25}
# Example docker-compose.yml file
version: '3.7'

services:
  web:
    image: ${SWARMLET_REGISTRY}/test-app
    build: .
    deploy:
      mode: replicated
      replicas: 3
      labels:
        - traefik.frontend.rule=Host:test-app.${DOMAIN} # Specify the domain
        - traefik.enable=true
        - traefik.port=8000 # The container port to expose
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
```shell
# Example .env file
DOMAIN=mydomain.com
```

### Traefik configuration
Use the Let's Encrypt staging environment by adding the `acme.caServer` parameter to Traefik:
```yml {17}
# ADD THIS PARAMETER TO USE THE STAGING ENVIRONMENT
# --acme.caServer="https://acme-staging-v02.api.letsencrypt.org/directory"

services:
  traefik:
    # ...
    command: >
      --docker
      --docker.swarmmode
      --docker.watch
      --docker.exposedbydefault=true
      --entrypoints='Name:http Address::80'
      --entrypoints='Name:https Address::443 TLS'
      --consul
      --consul.endpoint="consul-leader:8500"
      --acme
      --acme.caServer="https://acme-staging-v02.api.letsencrypt.org/directory"
      --acme.email=${EMAIL}
      --acme.storage="traefik/acme/account"
      --acme.entryPoint=https
      --acme.httpChallenge.entryPoint=http
      --acme.onhostrule=true
      --acme.acmelogging=true
      --logLevel=INFO
      --accessLog
      --api
```
