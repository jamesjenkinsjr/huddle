import React from 'react'
import './Portal.css'
import Message from '../Message/Message'
import PortalAPIService from '../services/portal-api-service'

export default class Portal extends React.Component {
  state = {
    error: '',
  }

  handleRenderPortal = id => {
    PortalAPIService.getPortalByID(id)
      .then(portal => {
        if (!portal) {
          this.setState({
            error: 'Portal does not exist',
          })
        }
        this.props.handlePortal(id)
      })
      .then(() => {
        console.log('am i happening?')
        console.log(this.props.portal)
        this.handleRenderMessages(this.props.portal)
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
        console.log('am I now happening?')
        this.props.handleMessages(messages)
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
    if (this.state.error === '') {
      return (
        <section>
          <h1> Now viewing: {this.props.portal}</h1>
          {this.props.messages.length > 0 && <ul className='portal__message-list'>{messages}</ul>}
          {this.props.messages.length === 0 && <p>No messages found</p>}
        </section>
      )
    } else {
      return <h1>{this.state.error}</h1>
    }
  }
}
