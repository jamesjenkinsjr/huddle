import React from 'react'
import './MessageForm.css'
import MessageService from '../services/message-api-service'

export default class MessageForm extends React.Component {
  state = {
    error: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const { author, content } = e.target
    const newMessage = { author: author.value, content: content.value }
    newMessage.portal_id = this.props.portal_id
    MessageService.addMessage(newMessage)
      .then((message) => {
        MessageService.getMessageByID(message.id)
        this.props.handleNewMessage(message)
        content.value = ''
      })
      .catch(error => {
        this.setState({
          error: error.message,
        })
      })
  }

  handleTextarea = e => {
    if(!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.submitButton.click()
    }
  }

  render() {
    return (
      <form
        className="portal__message-form"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="author">
          Name
          <input type="text" name="author" id="author" />
        </label>
        <label htmlFor="content">
          Message
          <textarea
            onKeyPress={this.handleTextarea}
            name="content"
            id="content"
            required
          ></textarea>
        </label>
        <button type="submit" ref={input => this.submitButton = input}>Submit</button>
      </form>
    )
  }
}
