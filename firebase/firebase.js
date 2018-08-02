const firebaseConfig = require('./firebase-config');
const firebaseInit = require('firebase/app');
require('firebase/messaging');

firebaseInit.initializeApp(firebaseConfig);

module.exports = firebaseInit
