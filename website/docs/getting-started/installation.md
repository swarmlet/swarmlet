---
id: installation
title: Installation
---

## Installation
**Required**: Bash 4.0 or higher (run `bash --version`).  
> *Recommended operating system: Ubuntu 18.04 LTS*  

To install the latest version of Swarmlet, log in to your server and run:  
```shell
# Log in as root on your server

# Quick installation:
curl -fsSL https://get.swarmlet.dev | bash

# Custom installation:
curl -fsSL https://get.swarmlet.dev | bash -s \
  SWARMLET_DOMAIN=dev.mydomain.com \
  CREATE_SWAP=true
  SKIP_SWARMPROM=true

# Available installation options:
SWARMLET_DOMAIN=mydomain.com  # (defaults to server IP address)
DEBUG=true  # (default false) Run installation in debug mode
CREATE_SWAP=true  # (default false) Allocate 1GB of swap space
SKIP_METRICS=true  # (default false) Skip installation of Swarmpit and Swarmprom
SKIP_SWARMPIT=true  # (default false) Skip installation of Swarmpit
SKIP_SWARMPROM=true  # (default false) Skip installation of Swarmprom
```

The installation takes a few minutes to complete.  
Check if services are running:
```shell
# Using swarmlet
swarmlet info
swarmlet stack:list

# Using docker:
docker stack ls
```
