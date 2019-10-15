import React from 'react'
import './PortalForm.css'
import PortalAPIService from '../services/portal-api-service'

export default class PortalForm extends React.Component {
  state = {
    error: '',
    expiry_type: 'day',
  }

  handleNewPortal = e => {
    let expiry_timestamp;
    e.preventDefault()
    if(this.state.expiry_type === 'day') {
      switch (e.target.day_options.value) {
        case "day":
        expiry_timestamp = new Date()
        expiry_timestamp.setDate((expiry_timestamp.getDate() + 1))
        break;
        case "week":
        expiry_timestamp = new Date()
        expiry_timestamp.setDate((expiry_timestamp.getDate() + 7))
        break;
        case "2-weeks":
        expiry_timestamp = new Date()
        expiry_timestamp.setDate((expiry_timestamp.getDate() + 14))
        break;
        case "month":
        expiry_timestamp = new Date()
        expiry_timestamp.setMonth((expiry_timestamp.getMonth() + 1))
        break;
        case "3-months":
        expiry_timestamp = new Date()
        expiry_timestamp.setMonth((expiry_timestamp.getMonth() + 3))
        break;
        default: 
          return null;
      }
    }

    if(this.state.expiry_type === 'date') {
      expiry_timestamp = e.target.date.value;
    }

    const name = e.target.name.value
    PortalAPIService.createNewPortal({ name, expiry_timestamp })
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
      expiry_type: e.currentTarget.value
    })
  }

  render() {
    return (
      <form className="portal__form" onSubmit={e => this.handleNewPortal(e)}>
        <label htmlFor="name">
          Enter a Huddle name:
          <input type="text" name="name" id="name" required />
        </label>
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
          <label
            htmlFor="day_options"
          >
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
            <input
              type="datetime-local"
              id="date"
              name="date"
            ></input>
          </label>
        )}
        <button type="submit">Generate Portal</button>
      </form>
    )
  }
}
