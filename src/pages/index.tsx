import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageIntroduction from '@site/src/components/HomepageIntroduction';
import HomepageContent from '@site/src/components/HomepageContent';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Hello there, stranger!`}
      description="This is my lil website!">
      <HomepageHeader />
      <main>
        <HomepageIntroduction />
        <HomepageContent />
      </main>
    </Layout>
  );
}
