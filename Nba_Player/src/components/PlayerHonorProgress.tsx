import React from 'react';
import styles from './PlayerHonorProgress.module.scss';

interface HonorItem {
  label: string;
  value: number;
  max: number;
  color?: string;
}
interface Props {
  data: HonorItem[];
}
const PlayerHonorProgress: React.FC<Props> = ({ data }) => (
  <div className={styles.progressList}>
    {data.map(item => (
      <div key={item.label} className={styles.progressItem}>
        <span className={styles.label}>{item.label}</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{
              width: `${(item.value / item.max) * 100}%`,
              background: item.color || '#43a047',
            }}
          />
        </div>
        <span className={styles.value}>{item.value}/{item.max}</span>
      </div>
    ))}
  </div>
);
export default PlayerHonorProgress; 