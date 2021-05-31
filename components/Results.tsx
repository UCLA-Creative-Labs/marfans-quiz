import React, { useContext } from 'react';
import { CarouselContext } from './Carousel';

export default function Results(): JSX.Element {
  const {user} = useContext(CarouselContext);
  return (
    <div>
      <h1>
        Results
      </h1>
      {Object.keys(user).map((project) => 
        <p>{project}: {user[project]}</p>
      )}
    </div>
  );
}