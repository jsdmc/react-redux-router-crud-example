import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'redux/react'
import * as ContractActions from '../actions/ContractActions';

import { Link } from 'react-router';

@connect(state => ({}))
export default class ContractLink extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.actions = bindActionCreators(ContractActions, this.props.dispatch);
  }

  onDelete(e){
    this.actions.deleteContract(this.props.data)
  }

  render() {
    const editLink = `contracts/${this.props.data}`;
    return (
      <div>
        <span>{this.props.data}</span>
        <span>{' '}</span>
        <Link to={editLink}>Edit</Link>
        <span>{' '}</span>
        <button onClick={::this.onDelete}>Delete</button>
      </div>
    );
  }
}
