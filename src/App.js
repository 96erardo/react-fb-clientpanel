import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <h1>Hello World</h1>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
