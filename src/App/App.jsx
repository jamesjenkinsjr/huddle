import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Nav from '../Nav/Nav'
import PortalForm from '../PortalForm/PortalForm'
import Portal from '../Portal/Portal'
import About from '../About/About'
import HowTo from '../HowTo/HowTo'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      portal: {},
      messages: [],
    }
  }

  handlePortal = portal => {
    this.setState({
      portal: {
        id: portal.id,
        name: portal.name,
        use_password: portal.use_password,
        expiry_timestamp: portal.expiry_timestamp,
        create_timestamp: portal.create_timestamp,
      },
    })
  }

  handleMessages = data => {
    this.setState({
      messages: data,
    })
  }

  handleNewMessage = message => {
    this.setState({
      messages: [...this.state.messages, message],
    })
  }

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="portal__header">Huddle</h1>
            </Link>
          </header>
          {!this.state.error && (
            <>
              <Route
                exact
                path={['/', '/huddle/about', '/huddle/how-to']}
                render={() => <Nav />}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <PortalForm
                    {...routeProps}
                    handlePortal={this.handlePortal}
                    portal={this.state.portal}
                  />
                )}
              />
              <Route exact path="/huddle/about" render={() => <About />} />
              <Route exact path="/huddle/how-to" render={() => <HowTo />} />
              <Route
                exact
                path="/:id"
                render={routeProps => (
                  <Portal
                    {...routeProps}
                    handlePortal={this.handlePortal}
                    handleMessages={this.handleMessages}
                    handleNewMessage={this.handleNewMessage}
                    portal={this.state.portal}
                    messages={this.state.messages}
                  />
                )}
              />
            </>
          )}
          {this.state.error && <p className="App__error">{this.state.error}</p>}
        </div>
        <footer>
          <ul className="App__footer">
            <li>
              E-mail:{' '}
              <a href="mailto:me@jamesjenkins.dev">me@jamesjenkins.dev</a>
            </li>
            <li>
              © {new Date().getFullYear()} -{' '}
              <a href="https://jamesjenkins.dev">jamesjenkins.dev</a>
            </li>
          </ul>
        </footer>
      </>
    )
  }
}

export default App
