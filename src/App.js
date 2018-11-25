import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faUsers, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faPlus, faUsers, faArrowCircleRight);

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
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
