### Requirements

- [Deno](https://deno.land)
- (dev dependency) [Denon](https://github.com/denosaurs/denon)

### Development

```sh
# Install Deno
curl -fsSL https://deno.land/x/install/install.sh | sh

# (optional) Put this in your ~/.zshrc
export DENO_INSTALL="$HOME/.local"
export PATH="$DENO_INSTALL/bin:$PATH"

# Install Denon
deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.3.2/denon.ts
```

```sh
denon start
```

### Usage

```sh
deno run label-parser.js docker-compose.yml
```

### Docker

```sh
docker build -t label-parser .
docker run --rm -it -v `pwd`:/app label-parser docker-compose.yml
```
