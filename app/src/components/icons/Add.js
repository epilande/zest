import React, { PropTypes } from 'react';

const Add = ({ size = 20, stroke = '#36434D', opacity, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Plus</title>
    <g
      stroke={stroke}
      opacity={opacity}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M.5 6.5h12M6.5.5v12" />
    </g>
  </svg>
);

Add.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
};

export default Add;
