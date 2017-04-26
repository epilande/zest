import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from 'containers/App';
import Selection from 'containers/Selection';
import Project from 'containers/Project';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/selection" />
    <Route path="selection" component={Selection} />
    <Route path="project" component={Project} />
  </Route>
);
