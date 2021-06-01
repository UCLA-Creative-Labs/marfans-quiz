import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import { QUESTIONS, Question } from '../utils';
import { shuffle } from '../utils/array';

export default function Home(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const storage = window.sessionStorage;
    const shuffled = storage.getItem('shuffled');

    setQuestions(shuffled
      ? JSON.parse(shuffled) as Question[]
      : shuffle(QUESTIONS));
  }, []);

  useEffect(() => {
    const storage = window.sessionStorage;

    storage.setItem('shuffled', JSON.stringify(questions));
  }, [questions]);

  return (
    <Layout>
      <Carousel questions={questions}/>
    </Layout>
  );
}
