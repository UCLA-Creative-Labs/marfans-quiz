import React, { useContext } from 'react';
import styles from '../styles/QuizQuestion.module.scss';
import { Question } from '../utils';
import { CarouselContext } from './Carousel';

export interface QuizQuestionProps {
  question: Question;
}

export default function QuizQuestion(props: QuizQuestionProps): JSX.Element {
  const {question: {question, answers}} = props;
  const {next} = useContext(CarouselContext);

  return (
    <div id={styles.container}>
      <h1>{question}</h1>
      {answers.map(({answer}, i) =>
        <button className={styles.answer} key={i}>
          {answer}
        </button>,
      )}
      <button className={styles.next} onClick={next}>Next Question</button>
    </div>
  );
}