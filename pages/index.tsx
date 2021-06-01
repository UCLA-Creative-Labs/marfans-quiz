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

    if (shuffled) setQuestions(JSON.parse(shuffled) as Question[]);
    else {
      const shuffledQs = shuffle(QUESTIONS);
      storage.setItem('shuffled', JSON.stringify(shuffledQs));
    }
  }, []);

  return questions.length > 0 ? (
    <Layout>
      <Carousel questions={questions}/>
    </Layout>
  ) : <></>; // TODO: Add loading indicator? Might not be necessary since it's so short.
}
