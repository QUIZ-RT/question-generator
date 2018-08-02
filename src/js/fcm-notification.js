import { Toast, configureToasts } from 'toaster-js';
import UserController from './controllers/userController';
import { config } from '../../firebase/firebase-config';
import firebaseInit  from '../../firebase/firebase';



configureToasts({
  topOrigin: -20, // [default=0] Y-axis origin of the messages.
  deleteDelay: 500, // time until the toast is completely removed from the DOM after deleting.
});


const userController = new UserController();
firebaseInit.initializeApp(config);

const messaging = firebase.messaging();
messaging.usePublicVapidKey('BOzPyeozLKMO_os_EHr6IHKyW2ITrrqPODALSEI2tKKC2v-QePhtQLQ2kM1B2zMQLd94oV07o-JqQMj3HxRHIBM');
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');
  return messaging.getToken();
}).then((currentToken) => {
  if (currentToken) {
    userController.updateFcmToken('sdfsdfsdfsdf', currentToken);
  } else {
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
})
  .catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage((payload) => {
  // alert("Message is received at On opened browser");
  console.log('Message received. on app browser ');

  const element = document.createElement('div');
  element.textContent = 'An user has requested for admin access.!';
  const newToast = new Toast(element, Toast.TYPE_MESSAGE);
  element.addEventListener('click', () => {
    // alert("I am going to open the users list screen")

    const userController = new UserController();
    userController.searchUsers('AdminRequests');
    newToast.delete();
  });


  // ...
});
