import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';

const LineChart = ({
  width = 350,
  height = 300,
  data = [],
  lines = [], // array of { key, color, strokeWidth }
  xKey = 'month',
  yDomain, // optionally override domain
  showAxes = true,
  numTicksLeft = 5,
  padding = 0.5,
}) => {
  if (!data || data.length === 0 || lines.length === 0) return null;

  const xValues = data.map(d => d[xKey]);
  const xScale = scalePoint({
    domain: xValues,
    range: [0, width - 40],
    padding,
  });

  const yMaxDataValue = Math.max(
    ...data.flatMap(d => lines.map(line => d[line.key]))
  );
  const yScale = scaleLinear({
    domain: yDomain || [0, yMaxDataValue],
    range: [height - 40, 0],
  });

  return (
    <svg width={width} height={height} style={{ background: 'transparent' }}>
      <Group left={30} top={10}>
        {showAxes && (
          <>
            <AxisBottom top={height - 40} scale={xScale} />
            <AxisLeft scale={yScale} numTicks={numTicksLeft} />
          </>
        )}

        {lines.map((line, idx) => (
          <LinePath
            key={idx}
            data={data}
            x={d => xScale(d[xKey])}
            y={d => yScale(d[line.key])}
            stroke={line.color || '#888'}
            strokeWidth={line.strokeWidth || 2}
          />
        ))}
      </Group>
    </svg>
  );
};

export default LineChart;
