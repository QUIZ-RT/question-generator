importScripts('https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.3.0/firebase-messaging.js');

//todo will be checking later for background notification ie when the browser is minimized
const config = {
  apiKey: 'AIzaSyCff8miAN8YysKXXJOxzayw_Q_ABFJS7KM',
  authDomain: 'quzgenx.firebaseapp.com',
  databaseURL: 'https://quzgenx.firebaseio.com',
  projectId: 'quzgenx',
  storageBucket: '',
  messagingSenderId: '458758128125',
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
