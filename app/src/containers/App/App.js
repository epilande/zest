import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ipcRenderer } from 'electron';
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
    setProjects: PropTypes.func,
    updateProject: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      setProjects,
      updateProject,
    } = this.props;
    ipcRenderer.on(SET_PROJECTS, (event, projects) => {
      setProjects(projects);
    });

    ipcRenderer.send(INIT_APP);

    ipcRenderer.on('test results', (event, { /* projectPath, */ projectPath, ...rest }) => {
      updateProject(projectPath, rest)
    });

    ipcRenderer.on('test error', (event, error) => {
      console.error('error: ', error);
    });
  }

  render() {
    return (
      <div className={styles.base}>
        <button onClick={this.setProjectDir}>Select Project Folder</button>
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
