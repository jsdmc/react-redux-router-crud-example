import React, { PropTypes } from 'react'
import shallowEqualScalar from 'redux/lib/utils/shallowEqual'
import { bindActionCreators } from 'redux'
import * as ContractActions from '../actions/ContractActions';

export default function fetchOnInit (fn) {

  return DecoratedComponent =>
  class FetchOnInitDecorator extends React.Component {

    constructor(props, context) {
      super(props, context);
      const actions = bindActionCreators(ContractActions, this.props.dispatch);
      fn(actions);
    }

    /* Here you can adjust behaviour of component 
    componentWillMount () {
      
    }

    componentDidUpdate (prevProps) {
      
    }
    */

    render () {
      return (
        <DecoratedComponent {...this.props} />
      )
    }
  }
}
