import React from 'react'
import './Portal.css'
import Message from '../Message/Message'
import PortalAPIService from '../services/portal-api-service'
import MessageForm from '../MessageForm/MessageForm'
import TokenService from '../services/token-service'

export default class Portal extends React.Component {
  state = {
    error: '',
    loading: true,
    gated: false,
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

  handleRenderPortal = id => {
    this.setState({
      loading: true,
    })
    PortalAPIService.getPortalByID(id)
      .then(portal => {
        if (!portal) {
          this.setState({
            error: 'Portal does not exist',
          })
        }
        this.props.handlePortal(portal)
      })
      .then(() => {
        /**
         * Check if portal does not require password before
         * loading portal messages. If it does, render
         * check that an auth token is set before attempting
         * intial message loading
         */
        if (!this.props.portal.use_password || TokenService.hasPortalToken(this.props.portal.id)) {
          this.handleRenderMessages(this.props.portal.id)
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          gated: this.props.portal.use_password,
        })
      })
      .catch(error => {
        if (error.message === 'Unauthorized portal request') {
          this.setState({
            error: error.message,
            gated: true,
          })
        } else {
          this.setState({
            error: error.message,
          })
        }
      })
  }

  handleRenderMessages = id => {
    if (!id) {
      return
    }
    if (
      /**
       * Depending on status of portal validation,
       * check for both props or local state to police
       * messages loading.
       */

      (this.props.portal.use_password || this.state.gated) &&
      !TokenService.hasPortalToken(this.props.match.params.id)
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
    e.target.validate_password.value = ''
    PortalAPIService.authorizeGatedPortal(this.props.match.params.id, {
      password,
    })
      .then(res => {
        TokenService.setPortalToken(this.props.match.params.id, res.portalAuth)
        this.setState({
          validated: true,
          error: '',
        })
      })
      .then(() => this.handleRenderPortal(this.props.match.params.id))
      .catch(error => this.setState({ error: error.message }))
  }

  handleClosePortal = e => {
    e.preventDefault()
    if (this.state.gated) {
      TokenService.clearPortalToken(this.props.portal.id)
      this.handleRenderPortal(this.props.portal.id)
    } else {
      this.props.history.push('/')
    }
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
      (!this.state.gated || TokenService.hasPortalToken(this.props.match.params.id))
    ) {
      return (
        <section>
          <h1>{this.props.portal.name}</h1>
          <button
            className="portal__close-session"
            onClick={this.handleClosePortal}
          >
            Exit Huddle
          </button>
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
          {this.props.messages.length === 0 && <p>No messages found.</p>}
          <MessageForm
            handleNewMessage={this.props.handleNewMessage}
            portal_id={this.props.match.params.id}
          />
        </section>
      )
    } else if (this.state.gated && !TokenService.hasPortalToken(this.props.match.params.id)) {
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
