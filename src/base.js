import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCI_dNnyq0f99tZWNtx6GLWdPg0dWIqe8A",
    authDomain: "catch-of-the-day-dejan-lukic.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-dejan-lukic.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is named export
export { firebaseApp };

// default export
export default base;