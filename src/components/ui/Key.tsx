'use client';
import React from 'react';


// THIS COMPOINENT IS NO LONGER USED AND HAS BEEN MOVED INTO D3Map CODE

function GradientBar() {
  const width = 600;
  const height = 80; 
  const barWidth = 580;       // the actual width of the gradient bar
  const barHeight = 20;
  const barY = 30;            // vertical position of the gradient bar
  const increments = [0, 25, 50, 75, 100];

  const barX = (width - barWidth) / 2; 

  return (
    <svg width={width} height={height} aria-label="Percent Support Gradient">
      <defs>
        <linearGradient id="percentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#edf8fb" />
          <stop offset="25%" stopColor="#b3cde3" />
          <stop offset="50%" stopColor="#8c96c6" />
          <stop offset="75%" stopColor="#8856a7" />
          <stop offset="100%" stopColor="#810f7c" />
        </linearGradient>
      </defs>

      {/* Centered Title */}
      <text
        x="50%"
        y="15"
        textAnchor="middle"
        fontSize="16"
        fontFamily="sans-serif"
        fill="#333"
      >
        Percent Support
      </text>

      {/* Gradient bar */}
      <rect
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        fill="url(#percentGradient)"
        stroke="#333"
        strokeWidth="2"
      />

      {/* Percentage labels */}
      {increments.map((val, i) => {
        // Position each label at the appropriate fraction of the bar's width
        const labelX = barX + (barWidth * (val / 100));
        let anchor = 'middle';
        if (i === 0) anchor = 'start';
        if (i === increments.length - 1) anchor = 'end';

        return (
          <text
            key={val}
            x={labelX}
            y={barY + barHeight + 20}
            textAnchor={anchor}
            fontSize="14"
            fontFamily="sans-serif"
            fill="#333"
          >
            {val}%
          </text>
        );
      })}
    </svg>
  );
}

export default GradientBar;
