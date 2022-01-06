import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/QuizQuestion.module.scss';
import { CarouselContext } from './Carousel';

export default function Raffle(): JSX.Element {
  const [ userEntered, setUserEntered ] = useState(false);
  const [ userName, setUserName ] = useState('');
  const [ userHandle, setUserHandle ] = useState('');

  const {next, firebase} = useContext(CarouselContext);

  const skip = () => {
    next();
  };

  const submit = () => {
    void firebase.addRaffleEntry(userName, userHandle);
    next();
  };

  useEffect(() => {
    setUserEntered(userName.length > 0 && userHandle.length > 0);
  }, [ userName, userHandle ]);

  return (
    <div id={styles.container}>
      <h1>drop ur socials for a surprise ;~)</h1>
      <p className={styles.label}>Name</p>
      <input
        className={styles.input}
        style={userName.length > 0 ? {
          border: '1px solid black',
        } : {
          border: '1px solid darkgray',
        }}
        value={userName}
        placeholder={'Joe Bruin'}
        onChange={ev => {
          setUserName(ev.target.value);
        }}
      />
      <p className={styles.label}>Instagram Handle</p>
      <input
        className={styles.input}
        style={userName.length > 0 ? {
          border: '1px solid black',
        } : {
          border: '1px solid darkgray',
        }}
        value={userHandle}
        placeholder={'@joebruin'}
        onChange={ev => {
          setUserHandle(ev.target.value);
        }}
      />
      <button style={{visibility: 'visible'}} className={styles.next} onClick={skip}>
        Skip Question
      </button>
      <button style={userEntered ? {visibility: 'visible'} : null} className={styles.next} onClick={submit}>
        Next Question
      </button>
    </div>
  );
}
