import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextInputGroup from './../layout/TextInputGroup';
import Alert from './../layout/Alert';

import { notifyUser } from './../../redux/actions/notifyActions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();

        const { firebase, notify } = this.props;
        const { email, password } = this.state;

        firebase   
            .login({email, password})
            .catch((err) => {
                notify('Invalid Login Credentials', 'error');
            });
    }

    render() {

        const { message, messageType } = this.props;

        return (
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center pb-4 pt-3">
                            <span className="text-primary">
                                <FontAwesomeIcon icon="lock" /> {' '}
                            </span>
                            Login
                        </h1>
                        {message && 
                            <Alert 
                                message={message}
                                messageType={messageType}
                            />
                        }
                        <form onSubmit={this.onSubmit}>
                            <TextInputGroup 
                                label="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                placeholder=""
                                type="email"
                                required={true}
                                error={this.state.errors.email}
                            />
                            <TextInputGroup
                                label="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                placeholder=""
                                type="password"
                                required={true}
                                error={this.state.errors.password}
                            />
                            <button type="submit" className="btn btn-primary btn-block mt-4">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.func.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.string
};

const mapStateToProps = (state) => ({
    message: state.notify.message,
    messageType: state.notify.messageType
});

const mapDispatchtToProps = (dispatch) => ({
    notify: (message, mesasgeType) => dispatch(notifyUser(message, mesasgeType))
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchtToProps)
)(Login);
