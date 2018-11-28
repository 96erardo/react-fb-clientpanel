import { NOTIFY_USER } from './../actions/types';

const initialState = {
    message: null,
    messageType: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_USER:
            return {
                ...state,
                message: action.payload.message,
                messageType: action.payload.messageType
            }
        default:
            return state;
    }
};