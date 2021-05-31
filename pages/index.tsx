import React from 'react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import { QUESTIONS } from '../utils';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Carousel questions={QUESTIONS}/>
    </Layout>
  );
}
