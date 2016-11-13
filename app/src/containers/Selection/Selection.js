import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Selection.css';

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello selection',
    };
  }

  render() {
    return (
      <div className={styles.base}>
        {this.state.text}
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default Selection;
