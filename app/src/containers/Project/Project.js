import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Project.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello project',
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

export default Project;
