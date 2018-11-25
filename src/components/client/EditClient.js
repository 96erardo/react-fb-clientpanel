import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TextInputGroup from './../layout/TextInputGroup';


class EditClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: '',
        errors: {}
    }

    static getDerivedStateFromProps (props, state) {
        const { client } = props;

        if (client) {

            const clone = Object.assign({}, client);

            return {
                firstName: clone.firstName,
                lastName: clone.lastName,
                email: clone.email,
                phone: clone.phone,
                balance: clone.balance
            }
        }

        return null;
    }   

    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, phone, balance } = this.state;
        const { firestore, match, history } = this.props;
        const client = { firstName, lastName, email, phone, balance };

        if (client.balance === '') {
            client.balance = '0';
        }

        firestore
            .update({ collection: 'clients', doc: match.params.id }, client)
            .then(() => history.push('/'));
    }

    render() {
        return (
            <div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <FontAwesomeIcon icon="arrow-circle-left" /> Back to Dashborad
                        </Link>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        Edit Client
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
                            <button type="submit" className="btn btn-primary btn-block">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);