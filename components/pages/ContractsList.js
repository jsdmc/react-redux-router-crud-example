import React, { Component } from 'react/addons';
import { connect } from 'react-redux'
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

  applySearch(query) {
    const queryLowerCase = query.trim().toLowerCase();
    const items = this.props.contracts;

    let result = items;

    if (queryLowerCase) {
      result = items.filter(c => {
        return (c.description.toLowerCase().includes(queryLowerCase) ||
          c.id.toString().toLowerCase().includes(queryLowerCase) ||
          c.finished.toString().toLowerCase().includes(queryLowerCase))
      });
    }

    return result;
  }

  render() {
    const { searchTerm } = this.props;
    const filteredItems = this.applySearch(searchTerm);

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
