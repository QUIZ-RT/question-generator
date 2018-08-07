import { Toast, configureToasts } from 'toaster-js';
import UserController from './controllers/userController';
import firebaseClient from './shared/firebase.client.config';
import TopicManagerController from './controllers/topicManagerController';

configureToasts({
  topOrigin: -50, // [default=0] Y-axis origin of the messages.
  deleteDelay: 5000, // time until the toast is completely removed from the DOM after deleting.
});

let userController = new UserController();
let topicManagerController = new TopicManagerController();

const messaging = firebaseClient.messaging();
messaging.usePublicVapidKey('BG96KHcY1hTDHCBxe54kuoe594S0loDgN9KCkCtovDWt8pGT8513Kr2SgF0VGjSsSyAMtzncLni4j1rvRxleFpc');

messaging.requestPermission().then(() => {

  console.log('Notification permission granted.');
  return messaging.getToken();
}).then((currentToken) => {
  if (currentToken) {
    localStorage.setItem('fcm-token', currentToken);
    userController.updateFcmToken(currentToken);
    new Toast("You have now subscribed to receive Push notification.", Toast.TYPE_DONE);
  } else {
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
}).catch((err) => {
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
  console.log('Message received. on app browser ');
  const element = document.createElement('div');
  element.textContent = `${payload.notification.body}`;
  const newToast = new Toast(element, Toast.TYPE_WARNING);
  element.addEventListener('click', () => {
    if (payload.notification.click_action == '#accessRequests') {
      userController.init();
    } else if (payload.notification.click_action == '#topicUpdate') {
      new TopicManagerController();
    }
    newToast.delete();
  });
});
