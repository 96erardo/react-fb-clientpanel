import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classname from 'classnames';

class Navbar extends Component {
  state = {
    collapsed: false,
  };

  toggle = (e) => {
    
    this.setState((prevState, props) => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {

    const navclass = classname({
      'collapse navbar-collapse': true,
      'show': this.state.collapsed
    });

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
            <Link to="/" className="navbar-brand">
                ClientPanel
            </Link>
            <button 
              className="navbar-toggler" 
              data-toggle="collapse" 
              data-target="navbarMain"
              onClick={this.toggle}
            >
                <span className="navbar-toggler-icon"></span>
            </button>   
            <div className={navclass} id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;