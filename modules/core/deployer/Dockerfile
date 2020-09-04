FROM docker/compose:1.25.4

RUN apk update && apk upgrade
RUN apk add bash apache2-utils python3 && pip3 install pyyaml >/dev/null

COPY entrypoint /entrypoint
WORKDIR /home/git
