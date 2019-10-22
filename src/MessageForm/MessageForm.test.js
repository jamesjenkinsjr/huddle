import React from 'react';
import ReactDOM from 'react-dom';
import MessageForm from './MessageForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessageForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
