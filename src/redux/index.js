import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'


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
firebase.firestore();

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
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