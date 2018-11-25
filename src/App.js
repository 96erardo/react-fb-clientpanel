import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faUsers, faArrowCircleRight, faArrowCircleLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/client/AddClient';
import Details from './components/client/Details';
import EditClient from './components/client/EditClient';

import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faPlus, faUsers, faArrowCircleRight, faArrowCircleLeft, faPencilAlt);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/:id" component={Details} />
                <Route exact path="/client/edit/:id" component={EditClient} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
