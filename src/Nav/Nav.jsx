import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="nav__container">
      <ul className='nav__list'>
        <Link to='/'><li>Home</li></Link>
        <Link to='/huddle/about'><li>About</li></Link>
        <Link to='/huddle/how-to'>How To Use</Link>
      </ul>
    </div>
  )
}