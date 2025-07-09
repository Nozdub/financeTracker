import React from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';

const data = [
  { category: 'Food', value: 500 },
  { category: 'Rent', value: 1200 },
  { category: 'Utilities', value: 300 },
  { category: 'Leisure', value: 200 },
];

const PieChart = ({ width = 350, height = 200 }) => {
  const radius = Math.min(width, height) / 2;
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let cumulative = 0;

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        {data.map((d, i) => {
          const startAngle = (cumulative / total) * 2 * Math.PI;
          cumulative += d.value;
          const endAngle = (cumulative / total) * 2 * Math.PI;

          return (
            <Arc
              key={i}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={40}
              outerRadius={radius}
              fill={['#C8C8C8', '#FFE4A9', '#D9D9D9', '#969696'][i % 4]}
            />
          );
        })}
      </Group>
    </svg>
  );
};

export default PieChart;
