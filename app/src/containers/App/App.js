import React, { Component } from 'react';
import { remote, ipcRenderer } from 'electron';

import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setProjectDir = this.setProjectDir.bind(this);
    this.state = {
      projectPath: '',
      results: {},
    };
  }

  componentDidMount() {
    ipcRenderer.on('test results', (event, results) => {
      console.log('results: ', results);
      this.setState({ results });
    });

    ipcRenderer.on('test error', (event, error) => {
      console.error('error: ', error);
    });
  }

  setProjectDir() {
    const { dialog } = remote;
    const dir = dialog.showOpenDialog({ properties: ['openDirectory'] });

    if (dir) {
      const [path] = dir;
      this.setState({ projectPath: path, results: {} }, () => {
        ipcRenderer.send('execute test', path);
      });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <button onClick={this.setProjectDir}>Select Project Folder</button>
        <p>{this.state.projectPath}</p>
        <p>{JSON.stringify(this.state.results)}</p>
      </div>
    );
  }
}
