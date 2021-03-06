import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Results.module.scss';
import { ProjectScores } from '../utils';
import { CarouselContext } from './Carousel';

export interface ResultsProps {
  reset: () => void;
  LOADING_CONTENT: string;
}

export default function Results(props: ResultsProps): JSX.Element {
  const {user, firebase} = useContext(CarouselContext);
  const [result, setResult] = useState(null);
  const [data, setData] = useState<ProjectScores>(null);
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(null);
  const {reset, LOADING_CONTENT} = props;

  useEffect(() => {
    const _result = Object.keys(user).reduce((key_l: string, key_r: string) =>
      user[key_l] > user[key_r] ? key_l : key_r);

    setResult(_result);
    void firebase.updateProjectCount(_result).then(() => {
      setTimeout(() => {
        setLoaded(true);
      }, 2500);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    void (async () => {
      const _data = await firebase.getProjectCounts();
      if (!_data) return;
      setTotal(Object.values(_data).reduce((acc, v) => v + acc, 0));
      setData(_data);
    })();
  }, [loaded]);

  if (!loaded) {
    return (
      <div id={styles.container}>
        <div id={styles.loading}>
          <div id={styles['loader-container']}>
            <div className={`${styles.circle} ${styles.green}`}/>
            <div className={`${styles.circle} ${styles.blue}`}/>
          </div>
          <h1>
            {LOADING_CONTENT}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div id={styles.container}>
      <h3>Results</h3>
      <h1>{result}</h1>
      {/* <p>{project2Blurb(result)}</p> */}
      <div id={styles.results}>
        <p>How your results compare to everyone else:</p>
        {data && Object.entries(data).map(([project, num]) => {
          const percentage = Math.floor(num / total * 100);
          return (
            <div className={styles.result} key={project}>
              <p>{project}</p>
              <div className={styles.bar}>
                <div className={styles.value} style={{width: `${percentage}%`}}/>
                <div className={styles.percentage}>{percentage}%</div>
              </div>
            </div>
          );})}
      </div>
      <button onClick={reset}>
        Again!
      </button>
    </div>
  );
}
