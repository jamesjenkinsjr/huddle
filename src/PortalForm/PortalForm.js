import React from 'react';
import PortalAPIService from '../services/portal-api-service'

export default class PortalForm extends React.Component {

  state = {
    error: ''
  }

  handleNewPortal = e => {
    
    e.preventDefault()
    PortalAPIService.createNewPortal()
      .then(portal => {
        this.props.handlePortal(portal.id)
      })
      .then(() => this.props.history.push(`/${this.props.portal}`))
      .catch(error => {
        this.setState({
          error: error.message,
        })
      })
  }
  render() {
    return <form onSubmit={e => this.handleNewPortal(e)}>
      <button type="submit">Generate Portal</button>
    </form>
  }
}