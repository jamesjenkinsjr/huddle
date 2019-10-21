import React from 'react'
import './HowTo.css'

export default () => {
  return (
    <div className="howto__container">
      <header>
        <h2>How To Use</h2>
      </header>
      <section>
        <ol className="howto__overview">
          <li>
            <p>Fill out Huddle portal form with required information:</p>
            <ul>
              <li>
                Huddle Name — Friendly name that will display while viewing a
                Huddle portal.
              </li>
              <li>
                Expiration — Date/time in the future that your Huddle portal
                will expire. After this date, the portal and all messages within
                will be permanently deleted.
              </li>
            </ul>
          </li>
          <li>
            <p>
              Optionally set a password on your portal to futher protect access
              to the conversation. This password is encrypted and never stored locally.
            </p>
          </li>
          <li><p>Submit the Huddle portal form</p></li>
          <li><p>IMPORANT! Copy and safeguard the URL to your portal. This is your ONLY
            resource for accessing the portal. If it is lost, your portal will not be
            retrievable.</p></li>
          <li><p>Share your portal URL with anyone, anywhere. The chat form will persist 
            the name you enter, allowing for quick messaging in seconds. Use SHIFT + ENTER
            to create paragraphs for longer messages.</p></li>
        </ol>
      </section>
    </div>
  )
}
