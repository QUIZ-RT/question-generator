importScripts('https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.3.0/firebase-messaging.js');

//todo will be checking later for background notification ie when the browser is minimized
const config = {
  apiKey: 'AIzaSyCYbFTLJktjYHMsK7Nx_m3UMJsw2Nq0O4Y',
  authDomain: 'quizgenx-884f0.firebaseapp.com',
  databaseURL: 'https://quizgenx-884f0.firebaseio.com',
  projectId: 'quizgenx-884f0',
  storageBucket: 'quizgenx-884f0.appspot.com',
  messagingSenderId: '826554593648',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
  const title = 'Hellow worls from the waorker process';
  const options = {
    body: ' payload.data.',
  };
  return self.registration.showNotification(title, options);
  // console.log('Message received. ate service warker '  );
  // ...
});
