import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Message from './Message'

describe('Message component', () => {
  it('renders Message by default', () => {
    const wrapper = shallow(<Message />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('renders given props', () => {
    const props = {
      author: 'test',
      content: 'This is some test content.',
      create_timestamp: new Date('2019-10-23T16:09:09.303Z').toLocaleString(),
      portal_id: 'a7580f03-d358-4f3f-a5f8-6b69ba02d83a'
    }
    console.log(props.create_timestamp)
    const wrapper = shallow(<Message {...props} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
