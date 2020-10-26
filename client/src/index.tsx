import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MoviePage } from './components/MoviePage';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/movie/:id'>
          <MoviePage />
        </Route>
        {/* This must be last */}
        <Route path='/'>
          <App />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
