import React from 'react';

export default class PortalForm extends React.Component {
  render() {
    return <form onSubmit={e => this.props.handleNewPortal(e)}>
      <button type="submit">Generate Portal</button>
    </form>
  }
}