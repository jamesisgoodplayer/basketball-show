import React from 'react';
import styles from './PlayerStatsBarChart.module.scss';

interface StatItem {
  label: string;
  value: number;
  color?: string;
  max?: number;
}
interface Props {
  data: StatItem[];
  maxValue?: number;
}
const BAR_WIDTH = 36;
const BAR_GAP = 24;
const CHART_HEIGHT = 180;

const PlayerStatsBarChart: React.FC<Props> = ({ data, maxValue }) => {
  const max = maxValue ?? Math.max(...data.map(d => d.value));
  return (
    <svg width={(BAR_WIDTH + BAR_GAP) * data.length} height={CHART_HEIGHT} className={styles.barChart}>
      {data.map((item, i) => {
        const barHeight = (item.value / max) * (CHART_HEIGHT - 40);
        return (
          <g key={item.label} transform={`translate(${i * (BAR_WIDTH + BAR_GAP)},0)`}>
            <rect
              x={0}
              y={CHART_HEIGHT - barHeight - 20}
              width={BAR_WIDTH}
              height={barHeight}
              fill={item.color || '#1976d2'}
              rx={6}
            />
            <text
              x={BAR_WIDTH / 2}
              y={CHART_HEIGHT - barHeight - 28}
              textAnchor="middle"
              fontSize="14"
              fill="#333"
            >
              {item.value}
            </text>
            <text
              x={BAR_WIDTH / 2}
              y={CHART_HEIGHT - 4}
              textAnchor="middle"
              fontSize="13"
              fill="#666"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
export default PlayerStatsBarChart; 