const firebaseInit = require('./firebase');
const ServerConstants = require('../firebase/server-constants');
const fetch = require("node-fetch");
require('firebase/database');

module.exports = class firebaseDatabase {

  getFirebaseData(refUrl) {
    return firebaseInit.database().ref(refUrl).once('value').then(response => response.val());
  }

  sendNotification(notificationType, userId, name) {
    return this.getFirebaseData(`/users`).then(data => {
      let targettedAdminFcmToken;
      for (const property in data) {
        if (data[property].hasOwnProperty("isAdmin") &&
          data[property].hasOwnProperty("isAdmin") == true) {
          if (data[property].hasOwnProperty("fcmToken")) {
            targettedAdminFcmToken = data[property].fcmToken;
            console.log("<===========FCM-TOKEN============>" + data[property].fcmToken);
            this.pushFcmNotification(notificationType, userId, name, targettedAdminFcmToken);
          }
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }

  pushFcmNotification(notificationType, userId, name, fcmToken) {
    let url = "https://fcm.googleapis.com/fcm/send";
    let authKey = "AAAAwHJ-MXA:APA91bHB6sWt89fC4q2-9oRZC_NqQvtujbM4-S-hLxLcUsnjPb6uJ9qkVA5tfQ2bq1zY5v25X6yqVQddir_2eWMxsineiu9v3xZw3FUmSawNQblcaQgpOkMzFD8anUkABBrEkpIHxSqoH6PW6w-KVsH6ERLJqEoZBA";
    let payload = {
      "notification": {
        "title": 'Default',
        "body": "Default Message",
        "click_action": "#defaultAccess"
      },
      "to": fcmToken
    };

    switch (notificationType) {
      case ServerConstants.NOTIFICATION_ADMIN_ACCESS:
      payload.notification.body =  name + " has requested admin access. Click to grant access",
      payload.notification.title = `Admin Access Request`;
      payload.notification.click_action = "#accessRequests";
        break;
      case ServerConstants.NOTIFICATION_TOPIC_UPDATE:
        payload.notification.body = `${name} has updated topic data. Click to View`;
        payload.notification.title = `Topic Update`;
        payload.notification.click_action = "#topicUpdate";
        break;
      default:
        break;
    }

    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `key=${authKey}` },
    };

    fetch(url, fetchOptions)
      .then(res => {
        if (res.status == 200) {
          console.log("FCM Push API call success");
        }
      })
      .then((err) => {
        // console.log("Error occurred while calling FCM APIs for notification ============================>>>>>>>>>>>>>>>>>>>>>>>");
      });
  }
};
