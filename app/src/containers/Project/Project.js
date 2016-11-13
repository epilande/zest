import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from 'components/Header';

import * as actions from './actions';
import styles from './Project.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
    const { projectPath } = this.props;
  }

  render() {
    const { project } = this.props;
    return (
      <div className={styles.base}>
        <Link to="/">Back</Link>
          <button onClick={this.setProjectDir}>Select Project Folder</button>
          <p>{JSON.stringify(project)}</p>
          <Header title="Testing 123" leftCorner="Back" rightCorner="Next" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    projects,
    selectedProjectPath,
  } = state.global;
  const project = projects.find(({ projectPath }) => projectPath === selectedProjectPath);
  return {
    project,
  };
}

export default connect(mapStateToProps, actions)(Project);
