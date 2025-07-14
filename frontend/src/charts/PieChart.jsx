import React from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';

const defaultData = [
  { category: 'Food', value: 500 },
  { category: 'Rent', value: 1200 },
  { category: 'Utilities', value: 300 },
  { category: 'Leisure', value: 200 },
];

const defaultColors = ['#F8AFA6', '#FFE4A9', '#D9D9D9', '#C8C8C8'];

const PieChart = ({
  data = defaultData,
  width = 250,
  height = 250,
  colors = defaultColors,
}) => {
  const radius = Math.min(width, height) / 2;
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let cumulative = 0;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          {data.map((d, i) => {
            const startAngle = (cumulative / total) * 2 * Math.PI;
            cumulative += d.value;
            const endAngle = (cumulative / total) * 2 * Math.PI;

            return (
              <g key={i}>
                <Arc
                  startAngle={startAngle}
                  endAngle={endAngle}
                  innerRadius={0} // Full pie chart
                  outerRadius={radius}
                  fill={colors[i % colors.length]}
                />
              </g>
            );
          })}
        </Group>
      </svg>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
          marginTop: 8,
        }}
      >
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: colors[i % colors.length],
                marginRight: 6,
              }}
            />
            {d.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
