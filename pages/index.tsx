import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import { Question, finalQuestion } from '../utils';
import { shuffle } from '../utils/array';

interface HomeProps {
  PROJECTS: string[]
  QUESTIONS: Question[];
}

export default function Home({PROJECTS, QUESTIONS}: HomeProps): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const storage = window.sessionStorage;
    const shuffled = storage.getItem('shuffled');

    setQuestions(shuffled
      ? JSON.parse(shuffled) as Question[]
      : [...shuffle(QUESTIONS), finalQuestion]);
  }, []);

  useEffect(() => {
    const storage = window.sessionStorage;

    storage.setItem('shuffled', JSON.stringify(questions));
  }, [questions]);

  return (
    <Layout>
      <Carousel projects={PROJECTS} questions={questions}/>
    </Layout>
  );
}

const query = `
  query {
    quizCollection(limit: 5) {
      items {
        title
        projects
        questions
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CONTENTFUL_DELIVERY_API}`,
    },
    body: JSON.stringify({query}),
  });
  const {data} = await res.json();

  const PROJECTS = data.quizCollection.items[0].projects;
  const QUESTIONS = data.quizCollection.items[0].questions;

  return {
    props: {
      PROJECTS,
      QUESTIONS,
    },
    revalidate: 60,
  };
};