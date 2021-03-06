import React, { useContext, useState } from 'react';
import styles from '../styles/QuizQuestion.module.scss';
import { Answer, Question } from '../utils';
import { CarouselContext } from './Carousel';

export interface QuizQuestionProps {
  slideIdx: number;
  question: Question;
}

export default function QuizQuestion(props: QuizQuestionProps): JSX.Element {
  const {question: {question, answers}, slideIdx} = props;
  const {next, quizLen, user, setUser} = useContext(CarouselContext);
  const [selection, setSelection] = useState<Answer>(null);

  const submit = () => {
    const {projects} = selection;
    projects.map(project => user[project]++);
    setUser(user);
    setSelection(null);
    next();
  };

  return (
    <div id={styles.container}>
      <p id={styles.progress}>{slideIdx}/{quizLen}</p>
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
      <button style={selection && {visibility: 'visible'}} className={styles.next} onClick={submit}>
        {slideIdx === quizLen ? 'Submit' : 'Next Question'}
      </button>
    </div>
  );
}
