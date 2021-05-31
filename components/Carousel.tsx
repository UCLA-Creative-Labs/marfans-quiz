import React, {createContext, useEffect, useState} from 'react';
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

  useEffect(() => {
    const storage = window.sessionStorage;
    const idx = storage.getItem('slideIdx');
    const state = storage.getItem('user');

    if (idx) setSlideIdx(+idx);
    if (state) setUser(JSON.parse(state));

    return () => {
      storage.removeItem('slideIdx');
      storage.removeItem('user');
    };
  }, []);

  useEffect(() => {
    const storage = window.sessionStorage;
    storage.setItem('slideIdx', slideIdx.toString());
    storage.setItem('user', JSON.stringify(user));
  }, [user, slideIdx]);

  const next = () => setSlideIdx(i => i + 1);
  const reset = () => {
    setSlideIdx(0);
    setUser({
      [PROJECT.LARK]: 0,
      [PROJECT.AR_UX]: 0,
      [PROJECT.MOVING_ON]: 0,
      [PROJECT.LETS_TAKE_A_WALK]: 0,
      [PROJECT.BUY_SMALL]: 0,
      [PROJECT.E_MOTION]: 0,
    });
  };

  return (
    <CarouselContext.Provider
      value={{ quizLen: questions.length, next, setUser, user }}>
      {slideIdx === 0
        ? <Splash/>
        : slideIdx > questions.length
          ? <Results reset={reset}/>
          : <QuizQuestion slideIdx={slideIdx} question={questions[slideIdx - 1]}/> }
    </CarouselContext.Provider>
  );
}