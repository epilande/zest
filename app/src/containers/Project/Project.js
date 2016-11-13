import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from 'components/Header';
import List from 'components/List';
import ListItem from 'components/ListItem';
import Button from 'components/Button';
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
    this.runTests = this.runTests.bind(this);
    this.state = {
    };
  }

  componentDidMount () {
    const { projectPath } = this.props;
  }

  runTests() {
    ipcRenderer.send('execute test', this.props.project.projectPath);
  }

  renderListItem(test, key, status) {
    let message;
    if (status === 'failure' && test.err) {
      message = test.err.message;
    }
    return (
      <ListItem className={styles.testListItem} key={key}>
        <div className={styles.testTitle}>
          <Status className={styles.testIcon} type={status} />
          <div>
            <div className={styles.fullTitle}>{test.fullTitle}</div>
            {message &&
              <div className={styles.errMessage}>{message}</div>
            }
          </div>
        </div>
        <div className={styles.duration}>{test.duration}ms</div>
      </ListItem>
    );
  }

  render() {
    const { project } = this.props;

    let passing
    let pending
    let failures
    if (project.passes) {
      passing = project.passes.map((test, index) => this.renderListItem(test, index, 'passing'));
      pending = project.pending.map((test, index) => this.renderListItem(test, index, 'pending'));
      failures = project.failures.map((test, index) => this.renderListItem(test, index, 'failure'));
    }

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
          <div>{project.inProgress ? 'Busy' : 'Idle'}</div>
          <div className={styles.total}><span>{project.stats ? project.stats.tests : '-'}</span> Tests</div>
        </div>
        <div className={styles.stats}>
          <Status size="large" type="passing">{project.stats ? project.stats.passes : '-'}</Status>
          <Status size="large" type="pending">{project.stats ? project.stats.pending : '-'}</Status>
          <Status size="large" type="failure">{project.stats ? project.stats.failures : '-'}</Status>
        </div>

        <List className={styles.testList}>
          {passing}
          {pending}
          {failures}
        </List>
        <div className={styles.action}>
          <Button onClick={this.runTests}>Run Tests</Button>
        </div>
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
