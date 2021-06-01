import React, { useContext, useEffect } from 'react';

import { CarouselContext } from './Carousel';
import { PROJECT } from '../utils/types';

export interface ResultsProps {
  reset: () => void;
}

export default function Results(props: ResultsProps): JSX.Element {
  const {user, firebase} = useContext(CarouselContext);
  const {reset} = props;

  useEffect(() => {
    const max = useEffect
    const maxProject =
      Object.keys(user).reduce((key_l: PROJECT, key_r: PROJECT) =>
                               user[key_l] > user[key_r] ? key_l : key_r);

    firebase.updateProjectCount(maxProject as PROJECT);
  }, []);

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
