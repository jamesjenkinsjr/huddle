import React from 'react'
import './About.css'

export default function About() {
  return (
    <div className="about__container">
      <header>
        <h2>About Huddle</h2>
      </header>
      <section>
        <p>
          Huddle was created to solve a simple problem: easily accessible lines
          of communication without a need to make new accounts, give out personal
          information, or worry about leaving someone out. 
        </p>
        <br/>
        <p>With Huddle, everyone
          with your unique Huddle room link (generated using a V4 UUID) can immediately provide basic,
          private information and jump into the conversation. No more forwarded
          emails, massive laggy text message groups, or social media friend
          requests. Simply generate a huddle room, provide the link to anyone,
          and get started being productive!</p>
      </section>
    </div>
  )
}
