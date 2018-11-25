import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Clients extends Component {
  render() {

    const clients = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@yahoo.com',
            phone: '222-222-2222',
            balance: '30'
        },
        {
            id: 2,
            firstName: 'Steven',
            lastName: 'Spilberg',
            email: 'ssteven@yahoo.com',
            phone: '777-777-7777',
            balance: '100'
        }
    ];

    return (
      <div>
        <div className="row">
            <div className="col-md-6">
                <h2>
                    <FontAwesomeIcon icon="users"/> Clients
                </h2>
            </div>
            <div className="col-md-6">
            </div>
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
                                    <FontAwesomeIcon icon="arrow-circle-right"/> Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </div>
    )
  }
}

export default Clients;