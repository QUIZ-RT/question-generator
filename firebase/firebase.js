const firebaseInit = require('firebase/app');
const firebaseConfig = require('./firebase-config');

firebaseInit.initializeApp(firebaseConfig);

module.exports = firebaseInit;
