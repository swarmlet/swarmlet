---
id: metrics-and-dashboards
title: Metrics and dashboards
custom_edit_url: null
---

export const Gallery = ({ name, images }) => {
  const imageProps = {
    style: {
      display: 'block',
      marginBottom: '15px',
      cursor: 'pointer',
    },
    onClick: image => () => window.open(`${window.location.origin}${image}`, '_blank'),
  }
  return (
    <div>
      <img
        src={images.slice(0, 1)}
        alt={name}
        style={imageProps.style}
        onClick={imageProps.onClick(images.slice(0, 1))}
      />
      <div style={{ columnCount: images.length - 1 }}>
        {images.slice(1, images.length).map(image => <img
          key={image}
          src={image}
          alt={name}
          style={imageProps.style}
          onClick={imageProps.onClick(image)}
          />)}
      </div>
    </div>
  )
}

## Swarmpit
<Gallery 
  images={[
    '/img/screenshots/swarmpit-0.png',
    '/img/screenshots/swarmpit-1.png',
    '/img/screenshots/swarmpit-2.png',
    '/img/screenshots/swarmpit-3.png',
  ]} />

## Grafana
<Gallery
  images={[
    '/img/screenshots/grafana-0.png',
    '/img/screenshots/grafana-1.png',
    '/img/screenshots/grafana-2.png',
  ]} />

## GitLab CE
> Not included by default  

<Gallery
  images={[
    '/img/screenshots/gitlab-ce-0.png',
    '/img/screenshots/gitlab-ce-1.png',
    '/img/screenshots/gitlab-ce-2.png',
  ]} />

## Traefik
<Gallery
  images={[
    '/img/screenshots/traefik-0.png',
    '/img/screenshots/traefik-1.png',
  ]} />

## Consul
<Gallery
  images={[
    '/img/screenshots/consul-0.png',
  ]} />

## Prometheus
<Gallery
  images={[
    '/img/screenshots/prometheus-0.png',
  ]} />

## Unsee
<Gallery
  images={[
    '/img/screenshots/unsee-0.png',
  ]} />

## Alertmanager
<Gallery
  images={[
    '/img/screenshots/alertmanager-0.png',
  ]} />
