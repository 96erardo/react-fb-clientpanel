import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Loading from './../layout/Loading';

class Clients extends Component {
    state = {
        totalOwed: null
    };

    static getDerivedStateFromProps (props, state) {
        const { clients } = props;

        if (clients) {
            const totalOwed = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString())
            }, 0);

            return { totalOwed };
        }

        return null;
    }

    render() {

        const { totalOwed } = this.state;
        const clients = !isLoaded(this.props.clients)
        ? []
        : isEmpty(this.props.clients)
        ? []
        : this.props.clients;

        return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h2>
                        <FontAwesomeIcon icon="users"/> Clients
                    </h2>
                </div>
                <div className="col-md-6">
                    { totalOwed &&
                        <h5 className="text-right text-secondary">
                            Total Owed {' '}
                            <span className="text-primary">
                                ${parseFloat(totalOwed).toFixed(2)}
                            </span> 
                        </h5>
                    }
                </div>
                {clients.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className="btn btn-secondary btn-small">
                                            <FontAwesomeIcon icon="arrow-circle-right" /> Details
                                </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
        )
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array,
}

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);