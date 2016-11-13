import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Status.css';

const cx = classNames.bind(styles);

const Status = ({
  className,
  type,
  size,
  ...props
}) => {
  const classes = cx(
    'base',
    className,
    size,
  );

  let icon;
  switch (type) {
    case 'passing':
      icon = 'passing';
      break;
    case 'pending':
      icon = 'pending';
      break;
    case 'failure':
      icon = 'failure';
      break;
    default:
      console.warn('`type` not supported'); // eslint-disable-line
  }

  return (
    <div
      className={classes}
      {...props}
    >
      <div className={styles.amount}>{props.children}</div>
      <div className={styles.label}>
        <div className={styles.icon}>{icon}</div>
        {(size === 'large') &&
          <div className={styles.typeText}>{type}</div>
        }
      </div>
    </div>
  );
};

Status.defaultProps = {
  size: 'small',
};

Status.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Status;
