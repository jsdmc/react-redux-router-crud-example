import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import App from './App';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';

import ContractsList from '../components/pages/ContractsList';
import ContractForm from '../components/pages/ContractForm';
import * as stores from '../stores';

const redux = createRedux(stores);

export default class Root extends Component {
  
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props

    return (
      <Provider redux={redux}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );
  }
}

function renderRoutes (history) {
  return (
    <Router history={history}>
      <Route component={App}>
        <Route path="addContract" component={ContractForm} />
        <Route path="contracts" component={ContractsList} />
        <Route path="contracts/:id" component={ContractForm} />
        <Redirect from="/" to="/contracts" />
      </Route>
    </Router>
  )
}

