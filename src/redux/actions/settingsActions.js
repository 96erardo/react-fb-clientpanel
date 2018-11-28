import {
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from './types';

export const setDisableBalanceOnAdd = () => ({
    type: DISABLE_BALANCE_ON_ADD
});

export const setDisableBalanceOnEdit = () => ({
    type: DISABLE_BALANCE_ON_EDIT
});

export const setAllowRegistration = () => ({
    type: ALLOW_REGISTRATION
});