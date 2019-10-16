import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import PortalForm from '../PortalForm/PortalForm'
import Portal from '../Portal/Portal'

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
        create_timestamp: portal.create_timestamp
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
      messages: [...this.state.messages, message]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h1 className="portal__header">Huddle</h1>
          </Link>
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
          <Route
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
        </header>
      </div>
    )
  }
}

export default App
