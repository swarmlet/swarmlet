FROM hayd/alpine-deno:1.3.0

WORKDIR /app

ADD . .

RUN deno cache label-parser.js

ENTRYPOINT ["deno", "run", "--no-check", "--allow-net", "--allow-read=/app", "label-parser.js"]
