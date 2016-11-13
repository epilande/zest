import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { remote, ipcRenderer } from 'electron';
import { connect } from 'react-redux';

import {
  INIT_APP,
  SET_PROJECTS,
} from 'ipc-events';

import * as actions from './actions';
import styles from './App.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
  };
  constructor(props) {
    super(props);
    this.setProjectDir = this.setProjectDir.bind(this);
    this.state = {
      projectPath: '',
      results: {},
    };
  }

  componentDidMount() {
    const { setProjects } = this.props;
    ipcRenderer.on(SET_PROJECTS, (event, projects) => {
      setProjects(projects);
    });

    ipcRenderer.send(INIT_APP);

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  actions,
)(App);
