import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MoviePage } from './components/MoviePage';
import { Navbar, NavbarBrand } from 'reactstrap';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Navbar color='dark' expand='md'>
      <NavbarBrand className='text-white' href='/'>
        Home
      </NavbarBrand>
    </Navbar>
    <Router>
      <Switch>
        <Route path='/movie/:id'>
          <MoviePage />
        </Route>
        {/* This must be last */}
        <Route exact path='/'>
          <App />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
