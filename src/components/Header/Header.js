import React, { PropTypes } from 'react';
import styles from './Header.css';

const Header = ({ title, leftControl, rightControl }) => (
  <div className={styles.base}>
    {leftControl &&
      <div>
        {leftControl}
      </div>
    }
    <div className={styles.title}>
      {title}
    </div>
    {rightControl &&
      <div>
        {rightControl}
      </div>
    }
  </div>
);

Header.defaultProps = {
  title: 'Zest',
};

Header.propTypes = {
  title: PropTypes.node,
  leftControl: PropTypes.node,
  rightControl: PropTypes.node,
};

export default Header;
