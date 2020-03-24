import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: (
      <Link
        className="featureLink"
        to="docs/getting-started/automatic-ssl-and-load-balancing"
      >
        Automatic SSL and load balancing
      </Link>
    ),
    imageUrl: "img/undraw_outer_space.svg",
    description: (
      <>
        Swarmlet uses Traefik, Consul and Let's Encrypt to provide automatic SSL
        and load balancing on your apps.
      </>
    )
  },
  {
    title: (
      <Link
        className="featureLink"
        to="docs/getting-started/metrics-and-dashboards"
      >
        Dashboards included
      </Link>
    ),
    imageUrl: "img/undraw_dashboard.svg",
    description: (
      <>
        Metrics tools and dashboards such as Swarmpit, Traefik, Grafana are
        included by default. With easy Slack integration.
      </>
    )
  },
  {
    title: (
      <Link className="featureLink" to="docs/examples/gitlab-ce">
        Self-hosted CI/CD with GitLab CE and GitLab Runners
      </Link>
    ),
    imageUrl: "img/undraw_version_control.svg",
    description: (
      <>
        Host GitLab CE on your swarm and attach GitLab Runners running on
        dedicated worker nodes for self-hosted CI/CD.
      </>
    )
  }
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Home`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg get-started',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting-started/introduction')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
