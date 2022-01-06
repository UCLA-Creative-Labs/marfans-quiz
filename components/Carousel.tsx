import React, {createContext, useEffect, useState} from 'react';

import { Question, ProjectScores, shuffle, LOADING_PHRASES } from '../utils';
import { _Firebase } from '../utils/firebase';
import QuizQuestion from './QuizQuestion';
import Raffle from './Raffle';
import Results from './Results';
import Splash from './Splash';

export interface CarouselProps {
  projects: string[];
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
  const {projects, questions} = props;
  const resetUser = (): ProjectScores => projects.reduce((acc, p) => {
    acc[p] = 0;
    return acc;
  }, {});
  const [slideIdx, setSlideIdx] = useState(0);
  const [user, setUser] = useState<ProjectScores>(resetUser());
  const [firebase] = useState(new _Firebase());

  useEffect(() => {
    const storage = window.sessionStorage;
    const idx = storage.getItem('slideIdx');
    const state = storage.getItem('user');

    if (idx) setSlideIdx(+idx);
    if (state) setUser(JSON.parse(state));

    void firebase.auth().signInAnonymously()
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
    setUser(resetUser());
  };

  return (
    <CarouselContext.Provider
      value={{ quizLen: questions.length, next, setUser, user, firebase }}>
      {slideIdx === 0
        ? <Splash/>
        : slideIdx === questions.length + 1
          ? <Raffle />
          : slideIdx > questions.length
            ? <Results reset={reset} LOADING_CONTENT={shuffle(LOADING_PHRASES)[0]}/>
            : <QuizQuestion slideIdx={slideIdx} question={questions[slideIdx - 1]}/> }
    </CarouselContext.Provider>
  );
}
