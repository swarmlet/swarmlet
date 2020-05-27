FROM docker/compose:1.25.4

RUN apk update && apk upgrade
RUN apk add bash

COPY entrypoint /entrypoint
WORKDIR /home/git
