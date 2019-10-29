import React from 'react'
import './Portal.css'
import Message from '../Message/Message'
import PortalAPIService from '../services/portal-api-service'
import MessageForm from '../MessageForm/MessageForm'
import TokenService from '../services/token-service'

export default class Portal extends React.Component {
  static defaultProps = {
    portal: {},
    messages: [],
    match: {
      params: {
        id: '',
      },
    },
    history: {
      push: () => {},
    },
  }
  state = {
    error: '',
    loading: true,
    gated: false,
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

  scrollToBottom = () => {
    this.scrollEl.scrollIntoView({ behavior: 'auto' })
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
        if (
          !this.props.portal.use_password ||
          TokenService.hasPortalToken(this.props.portal.id)
        ) {
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
        if (messages.length !== this.props.messages.length) {
          this.props.handleMessages(messages)
          this.setState({ loading: false })
        }
      })
      .catch(error => this.setState({ error: error.message, loading: false }))
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

  handleCopyURL = e => {
    const copyButton = document.getElementById('copy')
    // Chrome and Firefox allow for a much cleaner copy
    // to clipboard experience
    if (!!navigator.clipboard) {
      navigator.clipboard
        .writeText(e.target.value)
        .then(() => {
          copyButton.innerHTML = 'Copied Portal URL!'
          setTimeout(() => (copyButton.innerHTML = 'Copy Portal URL'), 2000)
        })
        .catch(err => {
          copyButton.innerHTML = 'Try Again'
          setTimeout(() => (copyButton.innerHTML = 'Copy Portal URL'), 2000)
        })
    } else {
      // for Safari and iOS devices we leverage an off-screen
      // input that we can store the URL in and select and copy from
      const input = document.getElementById('copy_data')
      input.setAttribute('value', e.target.value)
      const el = input
      const editable = el.contentEditable
      const readOnly = el.readOnly
      const range = document.createRange()
      range.selectNodeContents(el)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      el.focus()
      el.setSelectionRange(0, 999999)
      el.contentEditable = editable
      el.readOnly = readOnly
      document.execCommand('copy')

      copyButton.innerHTML = 'Copied Portal URL!'
      setTimeout(() => (copyButton.innerHTML = 'Copy Portal URL'), 2000)
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
      (!this.state.gated ||
        TokenService.hasPortalToken(this.props.match.params.id))
    ) {
      return (
        <section className="portal__container">
          <div className="portal__heading-container">
            <div className="portal__message-list-heading">
              <h2 className="portal__title">{this.props.portal.name}</h2>
              <p className="portal__expiry-datetime">
                Expires on{' '}
                {new Date(this.props.portal.expiry_timestamp).toLocaleString()}
              </p>
            </div>
            <div className="portal__heading-button-container">
              <input
                type="text"
                name="copy_data"
                id="copy_data"
                // select will not work with display: 'none' so instead
                // just banish the input that houses portal URL
                style={{ position: 'absolute', left: '-9999px' }}
              />
              <button
                id="copy"
                className="portal__copy-button"
                value={window.location.href}
                onClick={this.handleCopyURL}
              >
                Copy Portal Link
              </button>
              <button
                className="portal__close-session"
                onClick={this.handleClosePortal}
              >
                Exit Huddle
              </button>
            </div>
          </div>
          {this.props.messages.length > 0 && !this.state.loading && (
            <ul className="portal__message-list" tabIndex="0">
              {messages}
              <li
                style={{ float: 'left', clear: 'both' }}
                ref={el => (this.scrollEl = el)}
              ></li>
            </ul>
          )}
          {this.props.messages.length === 0 && (
            <p className="portal__empty-messages">No messages found.</p>
          )}
          <MessageForm
            handleNewMessage={this.props.handleNewMessage}
            portal_id={this.props.match.params.id}
          />
        </section>
      )
    } else if (
      this.state.gated &&
      !TokenService.hasPortalToken(this.props.match.params.id)
    ) {
      return (
        <form
          className="portal__gate-form"
          onSubmit={this.handlePortalValidation}
        >
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
    } else if (this.state.loading && !this.state.error) {
      return <h2 className="portal__loading-heading">Loading...</h2>
    } else {
      return <h2 className="portal__error">{this.state.error}</h2>
    }
  }
}
