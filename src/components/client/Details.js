import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';

class Details extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    };

    toggleBalanceUpdate = (e) => {
        this.setState((prevState, prevProps) => ({
            showBalanceUpdate: !prevState.showBalanceUpdate
        }));
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onBalanceUpdate = (e) => {
        e.preventDefault();

        const { balanceUpdateAmount } = this.state;
        const { firestore, client } = this.props;

        firestore
            .update({collection: 'clients', doc: client.id}, {balance: balanceUpdateAmount})
            .then(() => this.setState({showBalanceUpdate: false, balanceUpdateAmount: ''}));
    }

    onDeleteClick = (e) => {

        const { client, firestore, history } = this.props;

        firestore
            .delete({collection: 'clients', doc: client.id})
            .then(() => history.push('/'))
    }

    render () {

        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <Link to="/" className="btn btn-sm btn-link">
                                <FontAwesomeIcon icon="arrow-circle-left" /> Back To Dashboard
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <h3 className="card-header">
                            {client.firstName} {client.lastName}
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h3>
                                        Client ID: {' '}
                                        <span className="text-secondary">{client.id}</span>
                                    </h3>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h3 className="text-right">
                                        Balance: {' '}
                                        <span className={classnames({
                                            'text-danger': client.balance > 0,
                                            'text-success': client.balance == 0
                                        })}>
                                            ${parseFloat(client.balance).toFixed(2)}
                                        </span>
                                        <button onClick={this.toggleBalanceUpdate} className="btn btn-link">
                                            <FontAwesomeIcon icon="pencil-alt" />
                                        </button>
                                    </h3>
                                    {showBalanceUpdate &&
                                        <form onSubmit={this.onBalanceUpdate}>
                                            <div className="input-group">
                                                <input 
                                                    required
                                                    type="number"
                                                    name="balanceUpdateAmount"
                                                    className="form-control"
                                                    value={balanceUpdateAmount}
                                                    placeholder="Update Balance"
                                                    onChange={this.onChange}
                                                />
                                                <div className="input-group-append">
                                                    <input type="submit" value="Update" className="btn btn-outline-dark" />
                                                </div>
                                            </div>
                                        </form>
                                    }
                                </div>
                            </div>
                            <hr/>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Contact Email: {client.email}
                                </li>
                                <li className="list-group-item">
                                    Contact Phone: {client.phone}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        return <h4>Loading...</h4>
    }
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(Details);