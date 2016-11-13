import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Selection.css';

export default class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello world',
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
