import React from 'react'
import './PortalForm.css'
import PortalAPIService from '../services/portal-api-service'

export default class PortalForm extends React.Component {
  state = {
    error: '',
    validated: true,
    expiry_type: 'day',
    use_password: false,
    password: '',
    password_confirm: '',
  }

  handleNewPortal = e => {
    let expiry_timestamp
    e.preventDefault()

    if (this.state.expiry_type === 'day') {
      switch (e.target.day_options.value) {
        case 'day':
          expiry_timestamp = new Date()
          expiry_timestamp.setDate(expiry_timestamp.getDate() + 1)
          break
        case 'week':
          expiry_timestamp = new Date()
          expiry_timestamp.setDate(expiry_timestamp.getDate() + 7)
          break
        case '2-weeks':
          expiry_timestamp = new Date()
          expiry_timestamp.setDate(expiry_timestamp.getDate() + 14)
          break
        case 'month':
          expiry_timestamp = new Date()
          expiry_timestamp.setMonth(expiry_timestamp.getMonth() + 1)
          break
        case '3-months':
          expiry_timestamp = new Date()
          expiry_timestamp.setMonth(expiry_timestamp.getMonth() + 3)
          break
        default:
          return null
      }
    }

    if (this.state.expiry_type === 'date') {
      expiry_timestamp = e.target.date.value
    }

    const name = e.target.name.value
    const { use_password, password = null } = this.state

    PortalAPIService.createNewPortal({ name, expiry_timestamp, use_password, password })
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

  handleExpiryType = e => {
    e.preventDefault()
    this.setState({
      expiry_type: e.currentTarget.value,
    })
  }

  handlePasswordToggle = e => {
    e.stopPropagation()
    this.setState({
      use_password: !this.state.use_password,
    })
  }

  validatePasswords = () => {
    if(this.state.use_password && (this.state.password !== this.state.password_confirm)) {
      this.setState({
        error: 'Passwords must match',
        validated: false
      })
    } else if(this.state.password.length <= 3) {
      this.setState({
        error: 'Password must be greater than 3 characters',
        validated: false,
      })
    } else {
      this.setState({
        error: '',
        validated: true
      })
    }
    return;
  }
  handleUpdatePasswords = e => {
    if (e.target.id === 'password') {
    this.setState({
      password: e.target.value,
    })
  } else {
    this.setState({
      password_confirm: e.target.value,
    })
  }
}

  handlePassword = async (e) => {
    e.preventDefault()
    await this.handleUpdatePasswords(e)
    await this.validatePasswords()
  }

  render() {
    return (
      <form className="portal__form" onSubmit={e => this.handleNewPortal(e)}>
        {this.state.error !== '' && <p className='portal__form--error'>{this.state.error}</p>}
        <label htmlFor="name">
          Enter a Huddle name:
          <input type="text" name="name" id="name" required />
        </label>
        <label htmlFor="password_toggle">
          Use password?
          <input
            type="checkbox"
            name="password_toggle"
            id="password_toggle"
            onChange={this.handlePasswordToggle}
            checked={this.state.use_password}
          />
        </label>
        {this.state.use_password && (
          <>
            <label htmlFor="password">
              Enter password
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={this.handlePassword}
              />
            </label>
            <label htmlFor="password_confirm">
              Confirm password
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                required
                onChange={this.handlePassword}
              />
            </label>
          </>
        )}
        <label htmlFor="expiry_type">
          Expire Type
          <select
            name="expiry_type"
            id="expiry_type"
            onChange={this.handleExpiryType}
            value={this.state.expiry_type}
          >
            <option value="day">Day</option>
            <option value="date">Date</option>
          </select>
        </label>
        {this.state.expiry_type === 'day' && (
          <label htmlFor="day_options">
            Select Interval
            <select name="day_options" id="day_options">
              <option value="day">1 Day</option>
              <option value="week">1 Week</option>
              <option value="2-weeks">2 Weeks</option>
              <option value="month">1 Month</option>
              <option value="3-months">3 Months</option>
            </select>
          </label>
        )}
        {this.state.expiry_type === 'date' && (
          <label htmlFor="date">
            Select A Date
            <input type="datetime-local" id="date" name="date"></input>
          </label>
        )}
        <button type="submit" disabled={!this.state.validated}>Generate Portal</button>
      </form>
    )
  }
}
