import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextInputGroup from './../layout/TextInputGroup';
import { firestoreConnect } from 'react-redux-firebase';


class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, balance } = this.state;
    const { firestore, history } = this.props;
    const client = { firstName, lastName, email, phone, balance };

    if (client.balance === '') {
      client.balance = '0';
    }

    firestore
      .add({collection: 'clients'}, client)
      .then(() => history.push('/'));


    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="row mb-2">
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                    <FontAwesomeIcon icon="arrow-circle-left"/> Back to Dashborad
                </Link>
            </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            Add Client
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextInputGroup 
                label="First Name"
                name="firstName"
                value={this.state.firstName}
                placeholder=""
                type="text"
                onChange={this.onChange}
                required={true}
                error={this.state.errors.firstName}
              />
              <TextInputGroup
                label="Last Name"
                name="lastName"
                value={this.state.lastName}
                placeholder=""
                type="text"
                onChange={this.onChange}
                required={true}
                error={this.state.errors.lastName}
              />
              <TextInputGroup
                label="Email"
                name="email"
                value={this.state.email}
                placeholder=""
                type="text"
                onChange={this.onChange}
                required={true}
                error={this.state.errors.email}
              />
              <TextInputGroup
                label="Phone"
                name="phone"
                value={this.state.phone}
                placeholder=""
                type="text"
                onChange={this.onChange}
                required={true}
                error={this.state.errors.phone}
              />
              <TextInputGroup
                label="Balance"
                name="balance"
                value={this.state.balance}
                placeholder=""
                type="number "
                onChange={this.onChange}
                required={false}
                error={this.state.errors.balance}
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
