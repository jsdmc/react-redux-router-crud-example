import React, { Component } from 'react/addons';
import { connect } from 'redux/react'
import { bindActionCreators } from 'redux'
import * as ContractActions from '../../actions/ContractActions';

import { fetchOnInit } from '../../decorators'

import { Link } from 'react-router'
import Griddle from 'griddle-react'
import ContractLink from '../ContractLink'
import SearchBar from '../SearchBar'

@connect(state => ({
  contracts: state.contracts.items,
  searchTerm: state.contracts.searchTerm
}))
@fetchOnInit((actions) => {
  //TODO: here list can be updated silently from server when component is mounted
  //actions.fetchContracts()
})
export default class MainSection extends Component {

  columnMeta = [
    {
      "columnName": "id",
      "displayName": "Aiddiiii",
      "locked": false,
      "visible": true,
      "customComponent": ContractLink
    },
    {
      "columnName": "finished",
      "displayName": "Finished notes",
      "locked": true,
      "visible": true
    }
  ];

  constructor(props, context) {
    super(props, context);

    this.actions = bindActionCreators(ContractActions, this.props.dispatch);
  }

  render() {
    const { contracts , searchTerm } = this.props;
    const filteredItems = contracts.filter(c => c.description.includes(searchTerm));

    return (
      <div>
        <Link to="/addContract">
          Create contract
        </Link>
        <SearchBar actions={this.actions} searchTerm={this.props.searchTerm} />
        <section className='main'>
          <Griddle results={filteredItems} columns={["id", "description", "finished"]} columnMetadata={this.columnMeta} />
        </section>
      </div>
    );
  }
}
