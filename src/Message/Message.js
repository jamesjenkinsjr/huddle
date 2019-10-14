import React from 'react'
import './Message.css'

export default function Message(props) {
  return (
    <li className='portal__message-item'>
      <p>{props.content}</p>
      <p>Sent {props.create_timestamp} - {props.author} </p>
    </li>
  );
}