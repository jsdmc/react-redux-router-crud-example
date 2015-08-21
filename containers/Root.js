import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import App from './App';
import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import { Provider } from 'react-redux';

import ContractsList from '../components/pages/ContractsList';
import ContractForm from '../components/pages/ContractForm';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  logger // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default class Root extends Component {
  
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props

    return (
      <Provider store={store}>
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

