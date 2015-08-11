import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

export default class SearchBar extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    searchTerm: PropTypes.string.isRequired
  }
  
  constructor(props, context) {
    super(props, context);

    //set default state
    this.state = { query : this.props.searchTerm };
  }

  componentWillMount () {
    this.handleSearchDebounced = _.debounce(function () {
         this.props.actions.searchContracts(this.state.query)
     }, 500);
  }

  onChange(e){
    this.setState({query: event.target.value});
    this.handleSearchDebounced();
  }

  render() {
    return (
      <div>
        <span>Search</span>
        <input type="text" value={this.state.query} onChange={::this.onChange} />
      </div>
    );
  }
}
