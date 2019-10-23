import React from 'react'
import './Message.css'

export default function Message(props) {
  return (
    <li className="portal__message-item">
      <p className="portal__message-content">{props.content}</p>
      <p className="portal__message-info">
        Sent {props.create_timestamp} - {props.author}
      </p>
    </li>
  )
}
