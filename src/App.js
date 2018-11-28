import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { Provider } from 'react-redux';

import store from './redux';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helper/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faUsers, faArrowCircleRight, faArrowCircleLeft, faPencilAlt, faLock } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/client/AddClient';
import Details from './components/client/Details';
import EditClient from './components/client/EditClient';
import Login from './components/auth/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faPlus, faUsers, faArrowCircleRight, faArrowCircleLeft, faPencilAlt, faLock);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route 
                  exact 
                  path="/" 
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route 
                  exact 
                  path="/client/add" 
                  component={UserIsAuthenticated(AddClient)} 
                />
                <Route 
                  exact 
                  path="/client/:id" 
                  component={UserIsAuthenticated(Details)} 
                />
                <Route 
                  exact 
                  path="/client/edit/:id" 
                  component={UserIsAuthenticated(EditClient)} 
                />
                <Route 
                  exact 
                  path="/login" 
                  component={UserIsNotAuthenticated(Login)} 
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
