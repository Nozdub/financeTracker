import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';

const data = [
  { month: 'Jan', income: 3000, expense: 2000 },
  { month: 'Feb', income: 3200, expense: 2100 },
  { month: 'Mar', income: 3100, expense: 2200 },
  { month: 'Apr', income: 3050, expense: 2500 },
];

const LineChart = ({ width = 300, height = 200 }) => {
  const xScale = scalePoint({
    domain: data.map(d => d.month),
    range: [0, width - 40],
    padding: 0.5,
  });

  const yMax = Math.max(...data.map(d => Math.max(d.income, d.expense)));
  const yScale = scaleLinear({
    domain: [0, yMax],
    range: [height - 40, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={30} top={10}>
        <AxisBottom top={height - 40} scale={xScale} />
        <AxisLeft scale={yScale} />

        <LinePath
          data={data}
          x={d => xScale(d.month)}
          y={d => yScale(d.income)}
          stroke="hsl(35, 100%, 70%)"
          strokeWidth={2}
        />
        <LinePath
          data={data}
          x={d => xScale(d.month)}
          y={d => yScale(d.expense)}
          stroke="#888"
          strokeWidth={2}
        />
      </Group>
    </svg>
  );
};

export default LineChart;
