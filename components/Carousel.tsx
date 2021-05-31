import React, {createContext, useState} from 'react';
import { Question, PROJECT, UserInfo } from '../utils';
import QuizQuestion from './QuizQuestion';
import Results from './Results';
import Splash from './Splash';

export interface CarouselProps {
  questions: Question[];
}

interface ICarouselContext {
  quizLen: number;
  next: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  user: UserInfo;
}

export const CarouselContext = createContext<ICarouselContext>({
  quizLen: 0,
  next: null,
  setUser: null,
  user: null,
});

export default function Carousel(props: CarouselProps): JSX.Element {
  const {questions} = props;
  const [slideIdx, setSlideIdx] = useState(0);
  const [user, setUser] = useState<UserInfo>({
    [PROJECT.LARK]: 0,
    [PROJECT.AR_UX]: 0,
    [PROJECT.MOVING_ON]: 0,
    [PROJECT.LETS_TAKE_A_WALK]: 0,
    [PROJECT.BUY_SMALL]: 0,
    [PROJECT.E_MOTION]: 0,
  });
  const next = () => setSlideIdx(i => i + 1);

  return (
    <CarouselContext.Provider
      value={{ quizLen: questions.length, next, setUser, user }}>
      {slideIdx === 0
        ? <Splash/>
        : slideIdx > questions.length
          ? <Results />
          : <QuizQuestion question={questions[slideIdx - 1]}/> }
    </CarouselContext.Provider>
  );
}