import React, {createContext, useState} from 'react';
import { Question } from '../utils';
import QuizQuestion from './QuizQuestion';
import Results from './Results';
import Splash from './Splash';

export interface CarouselProps {
  questions: Question[];
}

export const CarouselContext = createContext({
  next: null,
});

export default function Carousel(props: CarouselProps): JSX.Element {
  const {questions} = props;
  const [slideIdx, setSlideIdx] = useState(0);
  const next = () => setSlideIdx(i => i + 1);

  return (
    <CarouselContext.Provider
      value={{next}}>
      <div>
        {slideIdx === 0
          ? <Splash/>
          : slideIdx > questions.length
            ? <Results />
            : <QuizQuestion question={questions[slideIdx - 1]}/> }
      </div>
    </CarouselContext.Provider>
  );
}