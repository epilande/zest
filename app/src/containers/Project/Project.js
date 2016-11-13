import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from 'components/Header';

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
          <button onClick={this.setProjectDir}>Select Project Folder</button>
          <p>{this.state.projectPath}</p>
          <p>{JSON.stringify(this.state.results)}</p>
          <Header title="Testing 123" leftCorner="Back" rightCorner="Next" />
      </div>
    );
  }
}

export default Project;
