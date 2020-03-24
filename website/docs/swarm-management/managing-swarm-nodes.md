---
id: managing-swarm-nodes
title: Managing swarm nodes
custom_edit_url: null
---

## Add or remove a swarm node
```shell
swarmlet node:add <role> <name> <node-ip>
swarmlet node:remove <name>

# Force swarm to re-initialize
# docker swarm init --force-new-cluster --advertise-addr 178.62.203.115
```
