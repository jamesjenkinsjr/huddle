import React from 'react'
import './Portal.css'
import Message from '../Message/Message'
import PortalAPIService from '../services/portal-api-service'
import MessageForm from '../MessageForm/MessageForm'

export default class Portal extends React.Component {
  state = {
    error: '',
    loading: false,
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
        this.handleRenderMessages(this.props.portal.id)
      })
      .catch(error =>
        this.setState({
          error: error.message,
        })
      )
  }
  handleRenderMessages = id => {
    PortalAPIService.getPortalMessages(id)
      .then(messages => {
        this.props.handleMessages(messages)
        this.setState({ loading: false })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  componentDidMount() {
    this.handleRenderPortal(this.props.match.params.id)
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
    if (this.state.error === '' && this.state.loading) {
      return <p>Loading Huddle...</p>
    } else if (this.state.error === '') {
      return (
        <section>
          <h1>{this.props.portal.name}</h1>
          {this.props.messages.length > 0 && (
            <ul className="portal__message-list">{messages}</ul>
          )}
          {this.props.messages.length === 0 && <p>No messages found</p>}
          <MessageForm handleNewMessage={this.props.handleNewMessage} portal_id={this.props.match.params.id}/>
        </section>
      )
    } else {
      return <h1>{this.state.error}</h1>
    }
  }
}
