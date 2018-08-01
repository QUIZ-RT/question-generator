import { config } from './firebase-config';

const firebaseInit = require('firebase/app');

firebaseInit.initializeApp(config);

export default firebaseInit;
