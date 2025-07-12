import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';

const data = [
  { label: 'Budgeted', value: 10000 },
  { label: 'Actual', value: 8200 },
];

const BarChart = ({ width = 350, height = 200 }) => {
  const xMax = width;
  const yMax = height - 40;

  // Scales
  const xScale = scaleBand({
    domain: data.map((d) => d.label),
    padding: 0.4,
    range: [0, xMax],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.value))],
    nice: true,
    range: [yMax, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group top={20}>
        {data.map((d, i) => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(d.value);
          const barX = xScale(d.label);
          const barY = yScale(d.value);

          return (
            <Bar
              key={i}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={i === 0 ? '#C8C8C8' : '#FFE4A9'}
              rx={4}
            />
          );
        })}
      </Group>
    </svg>
  );
};

export default BarChart;
