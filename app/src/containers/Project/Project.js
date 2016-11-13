import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  project as projectUtil,
} from 'utils';

import Header from 'components/Header';

import * as actions from './actions';
import styles from './Project.css';

class Project extends Component {
  static defaultProps = {
    project: {
      projectPath: '',
    },
  }

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
          <Header
            title={projectUtil.formatProjectName(project.projectPath)}
            leftCorner="Back"
            rightCorner="Next"
          />
          <p>{JSON.stringify(project)}</p>
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
