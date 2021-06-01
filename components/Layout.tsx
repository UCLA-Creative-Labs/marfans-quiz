import Head from 'next/head';
import React from 'react';
import styles from '../styles/Layout.module.scss';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content="Creative Labs" />
        <meta name="description" content="We are a community of students at UCLA working together to discover and pursue our creative passions."/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quiz.creativelabsucla.com/" />
        <meta property="og:title" content="Creative Labs" />
        <meta property="og:description" content="We are a community of students at UCLA working together to discover and pursue our creative passions." />
        <meta property="og:image" content="https://assets.creativelabsucla.com/metadata.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Creative Labs" />
        <meta property="twitter:description" content="We are a community of students at UCLA working together to discover and pursue our creative passions." />
        <meta property="twitter:image" content="https://assets.creativelabsucla.com/metadata.png" />

        <title>Personality Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id={styles['layout-container']}>
        {props.children}
      </main>
    </>
  );
}