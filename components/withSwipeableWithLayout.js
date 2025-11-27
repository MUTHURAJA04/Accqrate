import React from 'react';
import Layout from './Layout';
import SwipeableQuickActions from './SwipeableQuickActions';

export const withSwipeableWithLayout = (Component, layoutOptions = {}) => (props) => (
  <Layout {...layoutOptions}>
    <SwipeableQuickActions>
      <Component {...props} />
    </SwipeableQuickActions>
  </Layout>
);

export default withSwipeableWithLayout;