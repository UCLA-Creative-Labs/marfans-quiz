import React, { useContext, useEffect, useState } from 'react';
import { CarouselContext } from './Carousel';
import { PROJECT, ProjectScores, project2String, project2Blurb } from '../utils/types';
import styles from '../styles/Results.module.scss';

export interface ResultsProps {
  reset: () => void;
}

export default function Results(props: ResultsProps): JSX.Element {
  const {user, firebase} = useContext(CarouselContext);
  const [result, setResult] = useState(null);
  const [data, setData] = useState<ProjectScores>(null);
  const [total, setTotal] = useState(null);
  const {reset} = props;

  useEffect(() => {
    const _result = Object.keys(user).reduce((key_l: PROJECT, key_r: PROJECT) =>
                               user[key_l] > user[key_r] ? key_l : key_r);
    firebase.updateProjectCount(_result as PROJECT);
    setResult(_result);
    (async () => {
      const _data = await firebase.getProjectCounts();
      if (!_data) return;
      setTotal(Object.values(_data).reduce((acc, v) => v + acc, 0));
      setData(_data);
    })();
  }, []);

  return (
    <div id={styles.container}>
      <h3>Results</h3>
      <h1>{project2String(result)}</h1>
      <p>{project2Blurb(result)}</p>
      <div id={styles.results}>
        <p>How your results compare to everyone else:</p>
        {data && Object.entries(data).map(([project, num]) => {
          const percentage = Math.floor(num / total * 100);
          return (
            <div className={styles.result} key={project}>
              <p>{project2String(PROJECT[project])}</p>
              <div className={styles.bar}>
                <div className={styles.value} style={{width: `${percentage}%`}}/>
                <div className={styles.percentage}>{percentage}%</div>
              </div>
            </div>
          )})}
      </div>
      <button onClick={reset}>
        Again!
      </button>
    </div>
  );
}
