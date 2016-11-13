import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from './actions';
import styles from './Selection.css';

class Selection extends Component {
  static defaultProps = {
    projects: [],
  }
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { projects } = this.props;
    return (
      <div className={styles.base}>
        <Link to="/">Back</Link>
        <button onClick={this.setProjectDir}>Select Project Folder</button>
        {JSON.stringify(projects)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    projects: state.global.projects,
  };
}

export default connect(mapStateToProps, actions)(Selection);
