import React, { PropTypes } from 'react';
import styles from './Header.css';

const Header = ({ title, leftCorner, rightCorner }) => (
  <div className={styles.base}>
    <div>
      {leftCorner}
    </div>
    <div>
      {title}
    </div>
    <div>
      {rightCorner}
    </div>
  </div>
);

Header.defaultProps = {
  title: 'Zest',
};

Header.propTypes = {
  title: PropTypes.node,
  leftCorner: PropTypes.node,
  rightCorner: PropTypes.node,
};

export default Header;
