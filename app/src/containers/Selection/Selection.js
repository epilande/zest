import { remote, ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from 'components/Header';
import AddIcon from 'components/icons/Add';

import {
  project as projectUtil,
} from 'utils';

import * as globalActions from '../App/actions';

import * as actions from './actions';
import styles from './Selection.css';

class Selection extends Component {
  static defaultProps = {
    projects: [],
    selectProjectPath: () => {},
  }
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    selectProjectPath: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
    };

    this.setProjectDir = this.setProjectDir.bind(this);
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
    const {
      projects,
      selectProjectPath,
    } = this.props;
    const links = projects.map((project) => {
      const { projectPath } = project;
      const onClickHandler = () => selectProjectPath(project);
      return (
        <Link
          key={projectPath}
          to="/project"
          onClick={onClickHandler}
        >
          {projectUtil.formatProjectName(projectPath)}
        </Link>
      );
    });
    return (
      <div className={styles.base}>
        <Header
          title="Zest"
          leftControl={<AddIcon onClick={this.setProjectDir} />}
        />
        {links}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.global.projects,
  };
}

export default connect(mapStateToProps, {
  ...globalActions,
  ...actions,
})(Selection);
