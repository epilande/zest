import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from 'components/Header';
// import List from 'components/List';
// import ListItem from 'components/ListItem';
import Status from 'components/Status';
import PreviousIcon from 'components/icons/Previous';

import {
  project as projectUtil,
} from 'utils';

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
    console.log('project: ', project);
    return (
      <div className={styles.base}>
        <Header
          title={project && projectUtil.formatProjectName(project.projectPath)}
          leftControl={
            <Link to="/">
              <PreviousIcon
                size={18}
              />
            </Link>
          }
        />
        <div className={styles.status}>
          <div>Idle</div>
          <div className={styles.total}><span>{project.stats ? project.stats.tests : '-'}</span> Tests</div>
        </div>
        <div className={styles.stats}>
          <Status size="large" type="passing">{project.stats ? project.stats.passes : '-'}</Status>
          <Status size="large" type="pending">{project.stats ? project.stats.pending : '-'}</Status>
          <Status size="large" type="failure">{project.stats ? project.stats.failures : '-'}</Status>
        </div>

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
