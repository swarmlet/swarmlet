import { parse, stringify } from 'https://deno.land/std/encoding/yaml.ts'

const [filepath] = Deno.args
const decoder = new TextDecoder('utf-8')
const file = await Deno.readFile(filepath || './docker-compose.test.yml')
const data = parse(decoder.decode(file))

const defaultLabels = {
  'swarmlet.enable': (labels, service, enabled = true) => {
    return `traefik.enable=${enabled ? 'true' : 'false'}`
  },
  'swarmlet.middlewares': (labels, service, middlewares = 'redirect@file') => {
    return labels.some(label => label.includes('swarmlet.lego.email'))
      ? `traefik.http.routers.${service}.middlewares=${middlewares}`
      : undefined
  },
  'swarmlet.entrypoints': (labels, service, entrypoints = 'http') => {
    return `traefik.http.routers.${service}.entrypoints=${
      labels.some(label => label.includes('swarmlet.lego.email'))
        ? `${entrypoints},https`
        : entrypoints
    }`
  },
}

const newLabels = {
  'swarmlet.domains': (labels, service, domains) => {
    const rules = domains
      .split(',')
      .map(e =>
        e.includes('/')
          ? `(Host(\`${e.replace(/\/.+/g, '')}\`) && Path(\`${e.replace(
              /.+(?=\/)/g,
              '',
            )}\`))`
          : `Host(\`${e}\`)`,
      )
      .join(' || ')

    return [
      `traefik.http.routers.${service}.rule=${rules}`,
      ...(labels.some(label => label.includes('swarmlet.lego.email'))
        ? newLabels['swarmlet.lego.domains'](labels, service, domains)
        : []),
    ]
  },
  'swarmlet.port': (labels, service, port) => {
    return `traefik.http.services.${service}.loadbalancer.server.port=${port}`
  },
  'swarmlet.entrypoints': (labels, service, entrypoints) => {
    return `traefik.http.routers.${service}.entrypoints=${entrypoints}`
  },
  'swarmlet.middlewares': (labels, service, middlewares) => {
    return `traefik.http.routers.${service}.middlewares=${middlewares}`
  },
  'swarmlet.lego.domains': (labels, service, domains) => {
    const [domain] = domains
      .split(',')
      .filter(e => !e.includes('/'))
      .filter(e => /([a-z]+\.){1,}[a-z]+/gi.test(e))

    const subdomains = domains
      .split(',')
      .filter(e => /([a-z]+\.){2,}[a-z]+/gi.test(e))
      .map(e => e.replace(/\/.*/g, ''))
      .join(',')

    return [
      `traefik.http.routers.${service}.tls=true`,
      `traefik.http.routers.${service}.tls.certresolver=letsencrypt`,
      `traefik.http.routers.${service}.tls.domains[0].main=${domain}`,
      `traefik.http.routers.${service}.tls.domains[0].sans=${subdomains}`,
    ]
  },
  'swarmlet.lego.email': (labels, service, email) => {
    return `traefik.http.routers.${service}.tls.email=${email}`
  },
}

const parseYml = yml =>
  Object.entries(yml).reduce((sections, [sectionName, section]) => {
    switch (sectionName) {
      case 'services':
        return {
          ...sections,
          ...Object.entries(section).reduce(
            (services, [serviceName, service]) => ({
              ...services,
              [serviceName]: {
                ...service,
                deploy: {
                  ...(service.deploy || {}),
                  labels: service.deploy?.labels
                    ?.join('')
                    ?.includes('swarmlet.')
                    ? [
                        ...service.deploy.labels.filter(
                          e => !e.includes('swarmlet.'),
                        ),
                        ...Object.values(
                          service.deploy.labels
                            .filter(e => e.includes('swarmlet.'))
                            .map(e => e.split('='))
                            .reduce(
                              (acc, [key, value]) => ({
                                ...acc,
                                [key]: newLabels[key](
                                  service.deploy.labels,
                                  serviceName,
                                  value,
                                ),
                              }),
                              Object.keys(defaultLabels).reduce(
                                (acc, curr) => ({
                                  ...acc,
                                  [curr]: defaultLabels[curr](
                                    service.deploy.labels,
                                    serviceName,
                                  ),
                                }),
                                {},
                              ),
                            ),
                        )
                          .flat()
                          .filter(Boolean),
                      ]
                    : service.deploy?.labels,
                },
              },
            }),
            {},
          ),
        }

      // case 'networks':
      //   return {
      //     ...sections,
      //     [sectionName]: section,
      //   }
      default:
        return {
          ...sections,
          [sectionName]: section,
        }
    }
  }, {})

const output = stringify(parseYml(data))
console.log(output)
