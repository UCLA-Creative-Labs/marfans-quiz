import Image from 'next/image';
import React, { useContext } from 'react';
import styles from '../styles/Splash.module.scss';
import { CarouselContext } from './Carousel';

export default function Splash(): JSX.Element {
  const {next} = useContext(CarouselContext);

  return (
    <div id={styles.container}>
      <Image
        src={'/logo.svg'}
        width='120'
        height='17'/>
      <h1> What CL project are you? </h1>
      <Image
        src={'/landscape.svg'}
        width='589'
        height='273'/>
      <div id={styles.body}>
        <p>
          Take the CL Personality Test and find out which project group
          you&apos;d fit in with best! Then pull up to Demo Day to find out
          if we were right :]
        </p>
        <a href={'https://tinycl.com/demoday'}>
          [Link to Demo Day]
        </a>
        <button onClick={next}>
          Begin Quiz
        </button>
      </div>
    </div>
  );
}