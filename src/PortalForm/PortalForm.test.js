import React from 'react';
import ReactDOM from 'react-dom';
import PortalForm from './PortalForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PortalForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
