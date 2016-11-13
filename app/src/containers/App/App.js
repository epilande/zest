import React, { Component } from 'react';
import { Link } from 'react-router';
import { remote, ipcRenderer } from 'electron';

import Header from 'components/Header';

import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.setProjectDir = this.setProjectDir.bind(this);
    this.state = {
      projectPath: '',
      results: {},
    };
  }

  componentDidMount() {
    ipcRenderer.on('test results', (event, { /* projectPath, */ results }) => {
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
        ipcRenderer.send('watch directory', path);
        ipcRenderer.send('execute test', path);
      });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <Link to="/selection">Selection page</Link>
        <Link to="/project">Project page</Link>
        {this.props.children}
        <button onClick={this.setProjectDir}>Select Project Folder</button>
        <p>{this.state.projectPath}</p>
        <p>{JSON.stringify(this.state.results)}</p>
        <Header title="Testing 123" leftCorner="Back" rightCorner="Next" />
      </div>
    );
  }
}

export default App;
