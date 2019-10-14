import React from 'react'
import './App.css'
import PortalForm from '../PortalForm/PortalForm'
import PortalAPIService from '../services/portal-api-service'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      portal: '',
      messages: [],
    }
  }

  handleNewPortal = e => {
    e.preventDefault()
    console.log('new portal clicked')
    PortalAPIService.createNewPortal()
      .then(portal => {
        console.log(portal)
      })
      .catch(error => {
        this.setState({
          error: error.message,
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Huddle</h1>
          <PortalForm handleNewPortal={this.handleNewPortal} />
        </header>
      </div>
    )
  }
}

export default App
