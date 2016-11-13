import React, { PropTypes } from 'react';

const Circle = ({ size = 20, stroke = '#FF6D26', strokeWidth = 2, opacity, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Circle</title>
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2.5}
      strokeWidth={strokeWidth}
      stroke={stroke}
      opacity={opacity}
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);

Circle.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  opacity: PropTypes.number,
};

export default Circle;
