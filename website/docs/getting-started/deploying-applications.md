---
id: deploying-applications
title: Deploying applications
custom_edit_url: null
---

## How to deploy applications on your swarm
This guide describes how to deploy a simple Python web server using Redis on your swarm.  

## Example application setup
Create a new project locally:
```shell
# Create project folder
mkdir my-app
cd my-app

# Create files
touch app.py requirements.txt Dockerfile docker-compose.yml .env

# Create a local git repository and add a remote
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
    response = '<h1>Hello World!</h1>' \
      'I have been seen {} times<br>' \
      'HostName = {}<br>' \
      'IP = {}<br>' \
      'Try refreshing the page.' % (count, host_name, host_ip)
    return response

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
      - my-app-private
      - traefik-public
    deploy:
      mode: replicated
      replicas: 3
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
      - my-app-private

networks:
  my-app-private:
  traefik-public:
    external: true
```
Define environment variables in `.env`:
```shell
DOMAIN=mydomain.com
```
Create a new commit and deploy the application to the swarm using `git push`:
```shell
git add .
git commit -m 'initial'
git push origin master
```
Wait for Traefik to update it's configuration and visit your app at [https://my-app.mydomain.com]()!
