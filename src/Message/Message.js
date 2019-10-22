import React from 'react'
import './Message.css'

export default function Message(props) {
  // if(props.content.length > 128) {
  //   return (
  //     <li className='portal__message-item--collapsed'>
  //       <p>{props.content.slice(0, (128 - props.content.length))}&hellip;</p>
  //       <p>Sent {props.create_timestamp} - {props.author} </p>
  //     </li>
  //   )
  // } else {
    return (
      <li className='portal__message-item'>
        <p className='portal__message-content'>{props.content}</p>
        <p className='portal__message-info'>Sent {props.create_timestamp} - {props.author} </p>
      </li>
    )
  }
// }