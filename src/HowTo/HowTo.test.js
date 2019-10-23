import React from 'react'
import ReactDOM from 'react-dom'
import HowTo from './HowTo'

describe('HowTo component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<HowTo />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
