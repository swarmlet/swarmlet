---
id: deploying-applications
title: Deploying applications
custom_edit_url: null
---

## How it works
You can `git push` to any swarm manager node to create or update a repository and deploy your application on the swarm. Swarmlet creates a `git` user on the swarm node during installation and creates the `/var/repo` directory, which will contain the bare repositories for every application you deploy to the server using Swarmlet. If a repository does not exist, it will be created by a `pre-receive` git hook.  

After receiving the repository, the `post-receive` hook will execute, which triggers the `deployments` service. The `deployments` service searches for the (optional) `.env` and `entrypoint` files and the project `docker-compose.yml` file, which must be placed in the root of the project. It will build the project using `docker-compose build`, push it to the specified registry and deploy the stack using `docker stack deploy`.  

If you're deploying a project with a `Dockerfile` build step without registry, use the built-in Swarmlet registry. In the `docker-compose.yml` file, add:
```yml {3}
services:
  basic-example:
    image: ${SWARMLET_REGISTRY}/basic-example
    build: .
```
The `SWARMLET_REGISTRY` environment variable is available in every build and translates to `127.0.0.1:5000/v2`, this is the internal swarm registry address.

## How to deploy applications on your swarm
- Use an existing project, or create a new project based on one of the [examples](/docs/getting-started/deploying-applications#example-application-setup)
- Add a `docker-compose.yml` file in the root of your project: [example docker-compose.yml](https://github.com/woudsma/swarmlet/blob/master/examples/basic-example/docker-compose.yml)
- Add a git remote to your local project using `git remote add swarm git@swarm:my-app`
- Commit your files: `git add . && git commit -m 'initial'`
- Push to the swarm repository: `git push swarm master`
- Wait for Traefik to update it's configuration and visit your app at [https://my-app.mydomain.com]()

## Example application setup
This guide describes how to deploy a simple Python web server using Redis on your swarm.  

Create a new project locally:
```shell
# Create project folder
mkdir my-app
cd my-app

# Create files
touch app.py requirements.txt Dockerfile docker-compose.yml .env

# Initialize a local git repository and add a new remote
git init
git remote add origin git@swarm:my-app
```
Code a basic Python web server in `app.py`:
```python
from flask import Flask
from redis import Redis
import socket

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    count = redis.incr('hits')
    host_name = socket.gethostname()
    host_ip = socket.gethostbyname(host_name)
    return '<h1>Hello World!</h1>' \
      'I have been seen %s times<br>' \
      'HostName = %s<br>' \
      'IP = %s<br>' \
      'Try refreshing the page.' % (count, host_name, host_ip)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
```
Add the application dependencies to `requirements.txt`:
```txt
flask
redis
```
Describe the build steps in a `Dockerfile`:
```Dockerfile
FROM python:3.4-alpine
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```
Describe the application stack in a `docker-compose.yml` file including the desired hostname for the frontend service and internal container port to expose:
```yml
version: '3.7'

services:
  frontend:
    image: ${SWARMLET_REGISTRY}/my-app
    build: .
    networks:
      - my-app-private-network
      - traefik-public
    deploy:
      mode: replicated
      replicas: 3
      placement:
        preferences:
          - spread: node.id
      labels:
        - traefik.enable=true
        - traefik.port=8000
        - traefik.frontend.rule=Host:my-app.${DOMAIN}
        - traefik.tags=traefik-public
        - traefik.docker.network=traefik-public
        - traefik.redirectorservice.frontend.entryPoints=http
        - traefik.redirectorservice.frontend.redirect.entryPoint=https
        - traefik.webservice.frontend.entryPoints=https

  redis:
    image: redis:alpine
    networks:
      - my-app-private-network

networks:
  my-app-private-network:
  traefik-public:
    external: true
```
Define environment variables in `.env`:
```shell
DOMAIN=mydomain.com
```
> Or add the environment variables to the application stack configuration on the server:
```shell
swarmlet config:set my-app DOMAIN=mydomain.com
```

Create a new commit and deploy the application to the swarm using `git push`:
```shell
git add .
git commit -m 'initial'
git push origin master
```
Wait for Traefik to update it's configuration and visit your app at [https://my-app.mydomain.com]()!
