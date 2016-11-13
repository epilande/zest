import React, { Component, PropTypes } from 'react';
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
  };

  constructor(props) {
    super(props);
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
      ipcRenderer.send(INIT_APP);
      this.setState({ results });
    });

    ipcRenderer.on('test error', (event, error) => {
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
