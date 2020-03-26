---
id: ssh-key-setup
title: SSH key setup
custom_edit_url: null
---

## How to set up SSH keys for your swarm.

*(Optional)* Create a SSH key specifically for use with the swarm.
```shell
# Create SSH key
ssh-keygen -f ~/.ssh/id_rsa_swarm -t rsa -N '' -C "your@email.com"

# Copy key to server
ssh-copy-id -i ~/.ssh/id_rsa_swarm root@123.23.12.123
```

Assuming you've already added your SSH key to `/root/.ssh/authorized_keys` on your server, consider adding a `Host` entry to your local `~/.ssh/config` file:
```yaml
Host *
	Port 22
    UseKeychain yes

# ...

Host swarm
    HostName 123.23.12.123
    User root
    IdentityFile ~/.ssh/id_rsa_swarm # Optional
```
Now `ssh root@123.23.12.123` becomes `ssh swarm`.  
