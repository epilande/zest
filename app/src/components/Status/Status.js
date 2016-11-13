import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import CircleIcon from 'components/icons/Circle';
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

  const iconClasses = cx(
    'icon',
    type,
  );

  let strokeWidth = 3;
  let iconSize = 16;
  if (size === 'large') {
    strokeWidth = 4;
    iconSize = 22;
  }

  return (
    <div
      className={classes}
      {...props}
    >
      <div className={styles.amount}>{props.children}</div>
      <div className={styles.label}>
        <CircleIcon className={iconClasses} size={iconSize} strokeWidth={strokeWidth} />
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
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Status;
