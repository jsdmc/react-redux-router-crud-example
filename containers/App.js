import React, { PropTypes } from 'react'

export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any
  }

  constructor (props, context) {
    super(props, context)
  }
  render () {

    return (
      <div id="layout">
        <div id="main">
          {/* this will render the child routes */}
          {this.props.children}
        </div>
      </div>
    )
  }
}
