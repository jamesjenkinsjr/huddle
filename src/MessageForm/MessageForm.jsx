import React from 'react'
import { withCookies } from 'react-cookie'
import './MessageForm.css'
import MessageService from '../services/message-api-service'

class MessageForm extends React.Component {
  state = {
    error: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const { author, content } = e.target
    const newMessage = { author: author.value, content: content.value }
    newMessage.portal_id = this.props.portal_id
    MessageService.addMessage(newMessage)
      .then(message => {
        MessageService.getMessageByID(message.portal_id, message.id)
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
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.submitButton.click()
    }
  }

  setNameCookie = e => {
    e.preventDefault()
    this.props.cookies.set(`name-${this.props.portal_id}`, e.target.value, {path: `/${this.props.portal_id}`})
  }

  getNameCookie = () => {
    const nameCookie = this.props.cookies.get(`name-${this.props.portal_id}`)
    return nameCookie ? nameCookie : ''
  }

  render() {
    return (
      <form className="portal__message-form" onSubmit={this.handleSubmit}>
        <label htmlFor="author">
          Name
          <input type="text" name="author" id="author" defaultValue={this.getNameCookie()} onChange={this.setNameCookie} />
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
        <button type="submit" ref={input => (this.submitButton = input)}>
          Submit
        </button>
      </form>
    )
  }
}

export default withCookies(MessageForm)
