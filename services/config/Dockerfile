FROM docker/compose:1.25.4

ARG SWARMLET_REGISTRY
ENV SWARMLET_REGISTRY ${SWARMLET_REGISTRY}

RUN apk update && apk upgrade
RUN apk add bash

ADD entrypoint /bin/entrypoint
ENTRYPOINT ["/bin/entrypoint"]

WORKDIR /home/git
