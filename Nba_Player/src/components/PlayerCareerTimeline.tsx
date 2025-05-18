import React from 'react';
import styles from './PlayerCareerTimeline.module.scss';

interface CareerEvent {
  year: string;
  team: string;
  event: string;
  color?: string;
}
interface Props {
  data: CareerEvent[];
}
const PlayerCareerTimeline: React.FC<Props> = ({ data }) => (
  <div className={styles.timeline}>
    {data.map((item, i) => (
      <div className={styles.event} key={i}>
        <div className={styles.dot} style={{ background: item.color || '#1976d2' }} />
        <div className={styles.info}>
          <div className={styles.year}>{item.year}</div>
          <div className={styles.team}>{item.team}</div>
          <div className={styles.desc}>{item.event}</div>
        </div>
        {i < data.length - 1 && <div className={styles.line} />}
      </div>
    ))}
  </div>
);
export default PlayerCareerTimeline; 