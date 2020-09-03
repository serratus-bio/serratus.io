import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import App from './App';

var history = createBrowserHistory();

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize('UA-175034803-1');
  history.listen(() => ReactGA.pageview(window.location.pathname + window.location.search));
}

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
