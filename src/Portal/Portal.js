import React from 'react'
import './Portal.css'
import Message from '../Message/Message'
import PortalAPIService from '../services/portal-api-service'
import MessageForm from '../MessageForm/MessageForm'

export default class Portal extends React.Component {
  state = {
    error: '',
    loading: true,
  }

  scrollToBottom = () => {
    this.scrollEl.scrollIntoView({ behavior: 'auto' })
  }

  componentDidMount() {
    this.setState({
      loading: false,
    })
    this.handleRenderPortal(this.props.match.params.id)
    this.interval = setInterval(
      () => this.handleRenderMessages(this.props.portal.id),
      5000
    )
    if (this.scrollEl) {
      this.scrollToBottom()
    }
  }

  componentDidUpdate() {
    if (this.scrollEl) {
      this.scrollToBottom()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleRenderPortal = (id, password = '') => {
    this.setState({
      loading: true,
    })
    PortalAPIService.getPortalByID(id, password)
      .then(portal => {
        if (!portal) {
          this.setState({
            error: 'Portal does not exist',
          })
        }
        this.props.handlePortal(portal)
      })
      .then(() => {
        if (!this.props.portal.use_password || this.state.validated) {
          this.handleRenderMessages(this.props.portal.id)
        }
      })
      .then(() => {
        this.setState({
          loading: false,
        })
      })
      .catch(error => {
        if (error.message === 'Unauthorized portal request') {
          this.setState({
            error: error.message,
            gated: true,
            validated: false,
          })
        } else {
          this.setState({
            error: error.message,
          })
        }
      })
  }

  handleRenderMessages = id => {
    if(!id) {
      return
    }
    if (
      (this.props.portal.use_password || this.state.gated) &&
      !this.state.validated
    ) {
      return
    }
    PortalAPIService.getPortalMessages(id)
      .then(messages => {
        this.props.handleMessages(messages)
        this.setState({ loading: false })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  handlePortalValidation = e => {
    e.preventDefault()
    const password = e.target.validate_password.value
    this.handleRenderPortal(this.props.match.params.id, password)
    this.setState({
      validated: true,
      error: '',
    })
  }
  render() {
    const messages = this.props.messages.map(message => (
      <Message
        key={message.id}
        author={message.author}
        content={message.content}
        create_timestamp={new Date(message.create_timestamp).toLocaleString()}
      />
    ))
    if (
      !this.state.loading &&
      this.state.error === '' &&
      (!this.state.gated || this.state.validated)
    ) {
      return (
        <section>
          <h1>{this.props.portal.name}</h1>
          {this.state.loading && <p>Loading Huddle...</p>}
          {this.props.messages.length > 0 && !this.state.loading && (
            <ul className="portal__message-list">
              {messages}
              <li
                style={{ float: 'left', clear: 'both' }}
                ref={el => (this.scrollEl = el)}
              ></li>
            </ul>
          )}
          {this.props.messages.length === 0 && <p>No messages found</p>}
          <MessageForm
            handleNewMessage={this.props.handleNewMessage}
            portal_id={this.props.match.params.id}
          />
        </section>
      )
    } else if (this.state.gated && !this.state.validated) {
      return (
        <form onSubmit={this.handlePortalValidation}>
          <label htmlFor="validate_password">
            Enter password
            <input
              type="password"
              name="validate_password"
              id="validate_password"
            />
          </label>
        </form>
      )
    } else {
      return <h1>{this.state.error}</h1>
    }
  }
}
