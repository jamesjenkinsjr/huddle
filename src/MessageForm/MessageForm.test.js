import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import MessageForm from './MessageForm'

describe('MessageForm component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MessageForm />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
