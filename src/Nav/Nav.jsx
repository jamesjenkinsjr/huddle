import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="nav__container">
      <ul className="nav__list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/huddle/about">About</Link>
        </li>
        <li>
          <Link to="/huddle/how-to">How To Use</Link>
        </li>
      </ul>
    </div>
  )
}
