import { PROJECT, Answer } from './types';
import { Question } from './';

import questions from '../assets/questions.json';

export const QUESTIONS: Question[] =
  questions.map(question => {
    return {
      question: question.question,
      answers: question.answers.map(answer => {
        return {
          answer: answer.answer,
          projects: answer.projects.map(project => PROJECT[project])
        } as Answer
      })
    };
  });
