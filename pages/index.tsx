import React, { useRef } from 'react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import { QUESTIONS } from '../utils';
import { shuffle } from '../utils/array';

export default function Home(): JSX.Element {
  const questions = useRef(QUESTIONS);
  console.log(QUESTIONS);

  return (
    <Layout>
      <Carousel questions={questions.current}/>
    </Layout>
  );
}
