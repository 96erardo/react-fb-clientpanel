import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TextInputGroup from './../layout/TextInputGroup';


class EditClient extends Component {
    constructor (props) {
        super(props);

        this.state = { errors: {} };

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const client = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value
        };

        const { firestore, match, history } = this.props;

        if (client.balance === '') {
            client.balance = '0';
        }

        firestore
            .update({ collection: 'clients', doc: match.params.id }, client)
            .then(() => history.push('/'));
    }

    render() {
        
        if (!this.props.client) {
            return <h1>Loading...</h1>;
        }

        const { disableBalanceOnEdit } = this.props.settings;
        const { firstName, lastName, email, phone, balance } = this.props.client;

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
                                defaultValue={firstName}
                                placeholder=""
                                type="text"
                                onChange={this.onChange}
                                required={true}
                                error={this.state.errors.firstName}
                                reference={this.firstNameInput}
                            />
                            <TextInputGroup
                                label="Last Name"
                                name="lastName"
                                defaultValue={lastName}
                                placeholder=""
                                type="text"
                                onChange={this.onChange}
                                required={true}
                                error={this.state.errors.lastName}
                                reference={this.lastNameInput}
                            />
                            <TextInputGroup
                                label="Email"
                                name="email"
                                defaultValue={email}
                                placeholder=""
                                type="text"
                                onChange={this.onChange}
                                required={true}
                                error={this.state.errors.email}
                                reference={this.emailInput}
                            />
                            <TextInputGroup
                                label="Phone"
                                name="phone"
                                defaultValue={phone}
                                placeholder=""
                                type="text"
                                onChange={this.onChange}
                                required={true}
                                error={this.state.errors.phone}
                                reference={this.phoneInput}
                            />
                            <TextInputGroup
                                label="Balance"
                                name="balance"
                                defaultValue={balance}
                                placeholder=""
                                type="number"
                                onChange={this.onChange}
                                required={!disableBalanceOnEdit}
                                disabled={disableBalanceOnEdit}
                                error={this.state.errors.balance}
                                reference={this.balanceInput}
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
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings: settings
    }))
)(EditClient);