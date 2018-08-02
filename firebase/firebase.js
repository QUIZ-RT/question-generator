const firebaseConfig = require('./firebase-config');
const firebaseInit = require('firebase/app');

firebaseInit.initializeApp(firebaseConfig);

module.exports = firebaseInit
