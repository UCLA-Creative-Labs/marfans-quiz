import React from 'react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import { PROJECT, Question } from '../utils';

const questions: Question[] = [
  {
    question: 'How do we feel about Minecraft?',
    answers: [
      {
        answer: 'I only know Minetest.',
        projects: [PROJECT.LARK],
      },
      {
        answer: 'I was homeschooled',
        projects: [PROJECT.LARK],
      },
      {
        answer: 'No thanks, I had friends in middle school.',
        projects: [PROJECT.LARK],
      },
      {
        answer: '🎵 dust of the redstone 🎵',
        projects: [PROJECT.LARK],
      },
    ],
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Carousel questions={questions}/>
    </Layout>
  );
}
