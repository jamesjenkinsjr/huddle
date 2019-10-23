import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import PortalForm from './PortalForm'

describe('PortalForm component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<PortalForm />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
