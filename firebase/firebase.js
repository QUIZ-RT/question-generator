import { config } from './firebase-config';

const firebaseInit = require('firebase/app');
require('firebase/messaging')
firebaseInit.initializeApp(config);

export default firebaseInit;
