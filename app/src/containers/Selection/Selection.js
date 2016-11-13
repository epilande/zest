import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from './actions';
import styles from './Selection.css';

function formatProjectName(projectPath) {
  return projectPath.slice(projectPath.lastIndexOf('/'));
}

class Selection extends Component {
  static defaultProps = {
    projects: [],
    selectProjectPath: () => {},
  }
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
    selectProjectPath: PropTypes.function,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
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
          {formatProjectName(projectPath)}
        </Link>
      );
    });
    return (
      <div className={styles.base}>
        <Link to="/">Back</Link>
        <button onClick={this.setProjectDir}>Select Project Folder</button>
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

export default connect(mapStateToProps, actions)(Selection);
