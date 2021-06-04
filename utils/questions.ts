import { Question, Answer } from './types';
import { PROJECT } from './constants';
import questions from '../public/questions.json';

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
