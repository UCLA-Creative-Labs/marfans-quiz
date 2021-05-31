import React, { useContext, useState } from 'react';
import styles from '../styles/QuizQuestion.module.scss';
import { Answer, Question } from '../utils';
import { CarouselContext } from './Carousel';

export interface QuizQuestionProps {
  question: Question;
}

export default function QuizQuestion(props: QuizQuestionProps): JSX.Element {
  const {question: {question, answers}} = props;
  const {next, quizLen, user, setUser} = useContext(CarouselContext);
  const [selection, setSelection] = useState<Answer>(null);

  const current = Object.values(user).reduce((acc, v) => acc + v, 1);

  const submit = () => {
    const {projects} = selection;
    projects.map(project => user[project]++);
    setUser(user);
    next();
  };

  return (
    <div id={styles.container}>
      <p>{current}/{quizLen}</p>
      <h1>{question}</h1>
      {answers.map((answer, i) =>
        <button
          onClick={() => setSelection(answer)}
          id={answer === selection ? styles.select : ''}
          className={styles.answer}
          key={i}>
          {answer.answer}
        </button>,
      )}
      {selection &&
        <button className={styles.next} onClick={submit}>
          Next Question
        </button>
      }
    </div>
  );
}