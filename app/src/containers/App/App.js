import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';

import {
  INIT_APP,
  SET_PROJECTS,
  TEST_START,
  PROJECT_REMOVED,
} from 'ipc-events';

import * as actions from './actions';
import styles from './App.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    setProjects: PropTypes.func,
    updateProject: PropTypes.func,
    updateProjectProgress: PropTypes.func,
    deleteProject: PropTypes.func,
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
      updateProjectProgress,
      deleteProject,
    } = this.props;
    ipcRenderer.on(SET_PROJECTS, (event, projects) => {
      setProjects(projects);
      projects.forEach(project => updateProjectProgress(project.projectPath, false));
    });

    ipcRenderer.send(INIT_APP);

    ipcRenderer.on(PROJECT_REMOVED, (event, projectPath, wasRemoved) => {
      if (wasRemoved) {
        return deleteProject(projectPath);
      }
      return false;
    });

    ipcRenderer.on(TEST_START, (event, projectPath) => {
      updateProjectProgress(projectPath, true);
    });

    ipcRenderer.on('test results', (event, { /* projectPath, */ projectPath, ...rest }) => {
      updateProjectProgress(projectPath, false);
      updateProject(projectPath, rest);
    });

    ipcRenderer.on('test error', (event, error, projectPath) => {
      updateProjectProgress(projectPath, false);
      console.error('error: ', error);
    });
  }

  render() {
    return (
      <div className={styles.base}>
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
