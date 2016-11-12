import React, { Component } from 'react';
import { remote } from 'electron';

import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setProjectDir = this.setProjectDir.bind(this);
    this.state = {
      project: '',
    };
  }

  setProjectDir() {
    const { dialog } = remote;
    const dir = dialog.showOpenDialog({ properties: ['openDirectory'] });

    if (dir) {
      const [head] = dir;
      this.setState({ project: head });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.trayTriangle} />
        <main className={styles.main}>
          <button onClick={this.setProjectDir}>Select Project Folder</button>
          <p>{this.state.project}</p>
        </main>
      </div>
    );
  }
}
