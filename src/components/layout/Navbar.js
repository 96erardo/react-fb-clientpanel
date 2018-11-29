import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import classname from 'classnames';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Navbar extends Component {
  state = {
    collapsed: false,
    isAuthenticated: false
  };

  static getDerivedStateFromProps (props, state) {    
    const { auth } = props;
    return { isAuthenticated: auth.uid ? true : false };
  }

  toggle = (e) => {
    
    this.setState((prevState, props) => ({
      collapsed: !prevState.collapsed
    }));
  };

  onLogoutClick = (e) => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  }

  render() {

    const navclass = classname({
      'collapse navbar-collapse': true,
      'show': this.state.collapsed
    });

    const { isAuthenticated } = this.state;
    const { auth } = this.props;

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
                {isAuthenticated &&
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                }
              </ul>
              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#!" className="nav-link">
                      {auth.email}
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={this.onLogoutClick}>
                      Logout
                    </a>
                  </li>                  
                </ul>
              ):(
                <ul>

                </ul>
              )}
            </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(Navbar);