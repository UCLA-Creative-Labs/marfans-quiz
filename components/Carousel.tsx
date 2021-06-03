import React, {createContext, useEffect, useState} from 'react';

import { Question, ProjectScores, PROJECT } from '../utils';
import { _Firebase } from '../utils/firebase';
import QuizQuestion from './QuizQuestion';
import Results from './Results';
import Splash from './Splash';
import Raffle from './Raffle';

export interface CarouselProps {
  questions: Question[];
}

interface ICarouselContext {
  quizLen: number;
  next: () => void;
  setUser: React.Dispatch<React.SetStateAction<ProjectScores>>;
  user: ProjectScores;
  firebase: _Firebase;
}

export const CarouselContext = createContext<ICarouselContext>({
  quizLen: 0,
  next: null,
  setUser: null,
  user: null,
  firebase: null,
});

export default function Carousel(props: CarouselProps): JSX.Element {
  const {questions} = props;
  const [slideIdx, setSlideIdx] = useState(0);
  const [user, setUser] = useState<ProjectScores>({
    [PROJECT.LARK]: 0,
    [PROJECT.AR_UX]: 0,
    [PROJECT.MOVING_ON]: 0,
    [PROJECT.LETS_TAKE_A_WALK]: 0,
    [PROJECT.BUY_SMALL]: 0,
    [PROJECT.E_MOTION]: 0,
  });
  const [firebase] = useState(new _Firebase());

  useEffect(() => {
    const storage = window.sessionStorage;
    const idx = storage.getItem('slideIdx');
    const state = storage.getItem('user');

    if (idx) setSlideIdx(+idx);
    if (state) setUser(JSON.parse(state));
  
    firebase.auth().signInAnonymously()
      .then(() => {
        firebase.load(() => void 0, () => void 0);
      });

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
      value={{ quizLen: questions.length, next, setUser, user, firebase }}>
      {slideIdx === 0
        ? <Splash/>
        : slideIdx === questions.length + 1
          ? <Raffle />
          : slideIdx > questions.length
            ? <Results reset={reset}/>
            : <QuizQuestion slideIdx={slideIdx} question={questions[slideIdx - 1]}/> }
    </CarouselContext.Provider>
  );
}
