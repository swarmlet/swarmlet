FROM docker/compose:1.29.2

RUN apk update && apk upgrade
RUN apk add bash apache2-utils gettext jq &>/dev/null

COPY entrypoint /entrypoint
WORKDIR /mnt/gfs/git/data
