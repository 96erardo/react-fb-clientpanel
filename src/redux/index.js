import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
    apiKey: "AIzaSyAPvR0TwaaWg_YIxE-tUsTuBBwxkKSSXnw",
    authDomain: "reactclientpanel-c1310.firebaseapp.com",
    databaseURL: "https://reactclientpanel-c1310.firebaseio.com",
    projectId: "reactclientpanel-c1310",
    storageBucket: "reactclientpanel-c1310.appspot.com",
    messagingSenderId: "272342236514"
};

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};


firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer
});

const initialState = {};

const store = createStoreWithFirebase(
    rootReducer, 
    initialState, 
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;