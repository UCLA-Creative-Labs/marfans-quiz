import React, { useContext } from 'react';
import { CarouselContext } from './Carousel';

export interface ResultsProps {
  reset: () => void;
}

export default function Results(props: ResultsProps): JSX.Element {
  const {user} = useContext(CarouselContext);
  const {reset} = props;
  return (
    <div>
      <h1>
        Results
      </h1>
      {Object.keys(user).map((project) =>
        <p key={project}>{project}: {user[project]}</p>,
      )}
      <button onClick={reset}>
        Again!
      </button>
    </div>
  );
}