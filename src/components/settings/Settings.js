import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
} from './../../redux/actions/settingsActions'; 

class Settings extends Component {

    disableBalanceOnAddChange = (e) => {        
        const { setDisableBalanceOnAdd } = this.props;
        setDisableBalanceOnAdd();
    };

    disableBalanceOnEditChange = (e) => {
        const { setDisableBalanceOnEdit } = this.props;
        setDisableBalanceOnEdit();
    };

    allowRegistrationChange = (e) => {
        const { setAllowRegistration } = this.props;
        setAllowRegistration();
    };

    render() {

        const { 
            disableBalanceOnAdd, 
            disableBalanceOnEdit, 
            allowRegistration
        } = this.props.settings;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <FontAwesomeIcon icon="arrow-circle-left" />
                            {' '} Back To Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Edit Settings
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Allow Registration</label> {' '}
                                <input 
                                    type="checkbox"
                                    name="allowRegistration"
                                    checked={!!allowRegistration}
                                    onChange={this.allowRegistrationChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Disable Balance On Add</label> {' '}
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnAdd"
                                    checked={!!disableBalanceOnAdd}
                                    onChange={this.disableBalanceOnAddChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Disable Balance On Edit</label> {' '}
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnEdit"
                                    checked={!!disableBalanceOnEdit}
                                    onChange={this.disableBalanceOnEditChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    setAllowRegistration: PropTypes.func.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
    setAllowRegistration: () => dispatch(setAllowRegistration()),
    setDisableBalanceOnAdd: () => dispatch(setDisableBalanceOnAdd()),
    setDisableBalanceOnEdit: () => dispatch(setDisableBalanceOnEdit())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);