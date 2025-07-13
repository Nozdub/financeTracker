import React from 'react';

const defaultData = [
  { category: 'Bills', budget: 180, actual: 160 },
  { category: 'Expenses', budget: 80, actual: 15 },
  { category: 'Savings', budget: 500, actual: 166 },
  { category: 'Debt', budget: 200, actual: 50 },
];

const BarChart = ({
  width = 300,
  height = 200,
  data = defaultData,
  barHeight = 10,
  gap = 0,
  barSpacing = 35,
  budgetColor = '#FFE4A9',
  actualColor = '#F8AFA6',
  leftPadding = 55,


}) => {
  return (
    <svg width={width} height={height}>
      {/* Bars */}
      {data.map((d, i) => {
        const yStart = i * barSpacing + 40;
        return (
          <g key={i} transform={`translate(${leftPadding}, ${yStart})`}>
            {/* Category label */}
            <text x={-10} y={barHeight} textAnchor="end" fontSize={10} fill="#333">
              {d.category}
            </text>

            {/* Budget bar */}
            <rect x={0} y={0} height={barHeight} width={d.budget} fill={budgetColor} />

            {/* Actual bar below */}
            <rect x={0} y={barHeight + gap / 2} height={barHeight} width={d.actual} fill={actualColor}  />
          </g>
        );
      })}

      {/* X-Axis ticks (manual) */}
      {[0, 100, 200, 300, 400, 500].map((val) => (
        <g key={val} transform={`translate(${val + 50}, ${height - 20})`}>
          <line y2={-5} stroke="#999" />
          <text y={10} fontSize={8} textAnchor="middle" fill="#666">{val}</text>
        </g>
      ))}



      {/* Legend */}
      <g transform="translate(50, 10)">
        <rect x={0} y={0} width={12} height={12} fill={budgetColor} />
        <text x={18} y={10} fontSize={10} fill="#333">Budget</text>
        <rect x={70} y={0} width={12} height={12} fill={actualColor} />
        <text x={88} y={10} fontSize={10} fill="#333">Actual</text>
      </g>
    </svg>
  );
};

export default BarChart;
