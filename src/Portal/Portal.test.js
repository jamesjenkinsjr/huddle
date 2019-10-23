import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Portal from './Portal'

describe('Portal component', () => {
  const portal = {
    id: 'a7580f03-d358-4f3f-a5f8-6b69ba02d83a',
    name: 'Test Portal Name',
    create_timestamp: new Date('2019-10-23T16:09:09.303Z').toLocaleString(),
    expiry_timestamp: new Date('2019-10-24T16:09:09.303Z').toLocaleString(),
    use_password: false,
  }
  const messages = [
    {
      author: 'Tim',
      content: 'Hi this is a test',
      create_timestamp: new Date('2019-10-23T16:09:11.303Z').toLocaleString(),
      id: 1,
      portal_id: 'a7580f03-d358-4f3f-a5f8-6b69ba02d83a',
    },
    {
      author: 'Tim',
      content: 'Hi this is a test',
      create_timestamp: new Date('2019-10-23T16:09:12.303Z').toLocaleString(),
      id: 2,
      portal_id: 'a7580f03-d358-4f3f-a5f8-6b69ba02d83a',
    },
    {
      author: 'Tim',
      content: 'Hi this is a test',
      create_timestamp: new Date('2019-10-23T16:09:13.303Z').toLocaleString(),
      id: 3,
      portal_id: 'a7580f03-d358-4f3f-a5f8-6b69ba02d83a',
    },
  ]
  it('renders Portal in loading state by default', () => {
    const wrapper = shallow(<Portal />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('renders Portal by default when not loading', () => {
    const wrapper = shallow(<Portal />)
    wrapper.setState({ loading: false })
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('renders with portal and messages props provided', () => {
    const wrapper = shallow(<Portal portal={portal} messages={messages} />)
    wrapper.setProps({
      match: {
        params: {
          id: 'a7580f03-d358-4f3f-a5f8-6b69ba02d83a',
        },
      },
    })
    wrapper.setState({ loading: false })
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
