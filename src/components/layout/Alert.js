import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';

const Alert = (props) => {
    
    const { message, messageType } = props;
    
    return (
        <div className={classnames('alert', {
            'alert-success': messageType === 'success',
            'alert-danger': messageType === 'error'
        })}>
            {message}
        </div>
    )
}

Alert.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string
}

export default Alert;
