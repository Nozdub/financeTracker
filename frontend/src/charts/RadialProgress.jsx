import React from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';

const RadialProgress = ({
  width = 300,
  height = 300,
  progress = 0.65,
  radius: customRadius,
  fontSize = 14,
  showLabel = true,
}) => {
  const radius = customRadius || Math.min(width, height) / 2;

  return (
    <svg
      width={width}
      height={height}
      style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
    >
      <Group top={height / 2} left={width / 2}>
        <Arc
          startAngle={0}
          endAngle={2 * Math.PI}
          innerRadius={radius - 10}
          outerRadius={radius}
          fill="#eee"
        />
        <Arc
          startAngle={0}
          endAngle={2 * Math.PI * progress}
          innerRadius={radius - 10}
          outerRadius={radius}
          fill="hsl(35, 100%, 70%)"
        />
        {showLabel && (
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fill="#474747"
          >
            <tspan x="0" dy="-0.5em">{`${Math.round(progress * 100)}%`}</tspan>
            <tspan x="0" dy="1.2em">of 10,000</tspan>
          </text>
        )}
      </Group>
    </svg>
  );
};

export default RadialProgress;
