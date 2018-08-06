const firebaseClient = require('firebase/app');


firebaseClient.initializeApp({
  apiKey: 'AIzaSyCYbFTLJktjYHMsK7Nx_m3UMJsw2Nq0O4Y',
  authDomain: 'quizgenx-884f0.firebaseapp.com',
  databaseURL: 'https://quizgenx-884f0.firebaseio.com',
  projectId: 'quizgenx-884f0',
  storageBucket: 'quizgenx-884f0.appspot.com',
  messagingSenderId: '826554593648',
});

export default firebaseClient;
