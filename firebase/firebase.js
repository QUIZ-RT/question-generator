const firebaseInit = require('firebase/app');
const firebaseConfig = require('./firebase-config');
require('firebase/messaging');

firebaseInit.initializeApp(firebaseConfig);

module.exports = firebaseInit;
