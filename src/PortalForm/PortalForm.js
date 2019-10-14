import React from 'react'
import PortalAPIService from '../services/portal-api-service'

export default class PortalForm extends React.Component {
  state = {
    error: '',
  }

  handleNewPortal = e => {
    e.preventDefault()
    const name = e.target.name.value
    PortalAPIService.createNewPortal({ name })
      .then(portal => {
        this.props.handlePortal(portal)
      })
      .then(() => this.props.history.push(`/${this.props.portal.id}`))
      .catch(error => {
        this.setState({
          error: error.message,
        })
      })
  }
  render() {
    return (
      <form className="portal__form" onSubmit={e => this.handleNewPortal(e)}>
        <label htmlFor="name">
          Enter a Huddle name:
          <input type="text" name="name" id="name" required />
        </label>
        <button type="submit">Generate Portal</button>
      </form>
    )
  }
}
