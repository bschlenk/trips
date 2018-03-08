import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import './index.css';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <App />,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./pages/App/App', () => {
    const NextApp = require('./pages/App/App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl,
    );
  })
}
