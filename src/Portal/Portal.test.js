import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Portal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
