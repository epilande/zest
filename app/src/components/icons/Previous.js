import React, { PropTypes } from 'react';

const Previous = ({ size = 20, stroke = '#36434D', opacity, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Previous</title>
    <g
      stroke={stroke}
      opacity={opacity}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5.5l-6.45 6 6.45 6M.875 6.5h12" />
    </g>
  </svg>
);

Previous.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
};

export default Previous;
