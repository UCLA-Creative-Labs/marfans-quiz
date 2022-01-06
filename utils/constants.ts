import { Question, Answer } from './types';
import data from '../public/data.json';

export const PROJECTS: string[] = data.projects;

export const QUESTIONS: Question[] =
  Object.values(data.questions).map(question => {
    return {
      question: question.question,
      answers: Object.values(question.answers).map(answer => {
        return answer as Answer
      })
    };
  });


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

export const LOADING_PHRASES = [
  'catching frogs',
  'programming coffee machine',
  'taking a dance break',
  'singing Fallen Kingdom by Captain Sparklez',
  'actually running the calculation',
  'designing the hi-fi for the results page last minute',
  'sorry, this will take a second. Our lead data guy is in the Starbucks drive thru.',
  'losing Valorant',
];