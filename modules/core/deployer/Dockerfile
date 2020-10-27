FROM docker/compose:1.25.4

RUN apk update && apk upgrade
RUN apk add bash apache2-utils &>/dev/null

COPY entrypoint /entrypoint
WORKDIR /mnt/gfs/git/data
