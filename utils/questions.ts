import { PROJECT, Question, Answer } from './types';
import questions from '../public/questions.json';

export const finalQuestion: Question = {
  question: 'are you coming to demo day? (6/4 @ 7:30 p.m. pdt)',
  answers: [
    {
      answer: 'yes',
      projects: [],
    },
    {
      answer: 'YES',
      projects: [],
    },
    {
       answer: 'Of course',
       projects: [],
    },
    {
       answer: 'I\'ll be there',
       projects: [],
    }
  ]
};

export const QUESTIONS: Question[] =
  questions.map(question => {
    return {
      question: question.question,
      image: question?.image,
      answers: question.answers.map(answer => {
        return {
          answer: answer.answer,
          projects: answer.projects.map(project => PROJECT[project])
        } as Answer
      })
    };
  });
