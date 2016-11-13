import React, { PropTypes } from 'react';

const Close = ({ size = 20, stroke = '#36434D', opacity, ...props }) => (
  <svg
    width={size}
    height={Math.round(size * 0.818)}
    viewBox={`0 0 ${size} ${Math.round(size * 0.818)}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Close</title>
    <g
      stroke={stroke}
      opacity={opacity}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.257.257l8.486 8.486M9.743.257L1.257 8.743" />
    </g>
  </svg>
);

Close.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
  opacity: PropTypes.number,
};

export default Close;
