import React from 'react'
import './MessageForm.css'

export default class MessageForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault()
    const { author, content } = e.target;
    const newMessage = { author: author.value, content: content.value };
    console.log(newMessage)

  }
  render() {
    return (
      <form className="portal__message-form" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="author">
          Name
          <input type="text" name="author" id="author" />
        </label>
        <label htmlFor="content">
          Message
          <textarea name="content" id="content" required ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
