import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import './index.css';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <App />,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NextApp = require('./pages/App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl,
    );
  })
}
