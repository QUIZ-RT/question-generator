const firebase = require('firebase/app');
const firebaseInit = require('./firebase');
const ServerConstants = require('../firebase/server-constants');
const fetch = require("node-fetch");
require('firebase/database');

module.exports = class firebaseDatabase {
  getFirebaseData(refUrl) {
    return firebaseInit.database().ref(refUrl).once('value').then(response => response.val());
  }

  getFirebaseFilteredData(refUrl) {
    return firebaseInit.database().ref(refUrl)
      .orderByChild('isAdmin')
      .equalTo(false)
      .once('value')
      .then(response => response.val());
  }

  saveFirebaseData(refUrl, postDataObj, resolve, reject) {
    firebaseInit.database().ref(refUrl).set(postDataObj, (error) => {
      if (error) {
        reject('there is some issue we will come back sortly');
      } else {
        resolve(postDataObj);
      }
    });
  }

  updateFirebaseData(refUrl, postDataObj, resolve, reject) {
    firebaseInit.database().ref(refUrl).update(postDataObj, (error) => {
      if (error) {
        reject('there is some issue we will come back sortly');
      } else {
        resolve(postDataObj);
      }
    });
  }

  updateUser(userId, payload, resolve, reject) {
    const refUrl = `users/${userId}`;
    this.updateFirebaseData(refUrl, payload, resolve, reject);
  }

  getUserById(userId) {
    // const userId = firebase.auth().currentUser.uid;
    return this.getFirebaseData(`/users/${userId}`);
  }

  getAdminAccessRequestedUsers() {
    return this.getFirebaseFilteredData('users');
  }

  sendNotification(notificationType, userId, result) {
    const refUrl = `users/${userId}`;
    return this.getFirebaseData(`/users/`).then(data => {
      let targettedAdminFcmTokens = [];
      for (const property in data) {
        if (data[property].hasOwnProperty("isAdmin") &&
          data[property].hasOwnProperty("isAdmin") == true) {
          console.log("<===========FCM-TOKEN============>" + data[property].fcmToken);
          if (data[property].hasOwnProperty("fcmToken")) {
            targettedAdminFcmTokens.push(data[property].fcmToken);
            this.pushFcmNotification(targettedAdminFcmTokens);
          }
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }

  pushFcmNotification(fcmTokens) {
    let url = "https://fcm.googleapis.com/fcm/send";
    let authKey = "AAAAwHJ-MXA:APA91bHB6sWt89fC4q2-9oRZC_NqQvtujbM4-S-hLxLcUsnjPb6uJ9qkVA5tfQ2bq1zY5v25X6yqVQddir_2eWMxsineiu9v3xZw3FUmSawNQblcaQgpOkMzFD8anUkABBrEkpIHxSqoH6PW6w-KVsH6ERLJqEoZBA";
    let payload = {
      "notification": {
        "title": "Quiz1234",
        "body": "Background message body",
        "click_action": "AdminAccessRequest"
      },
      "to": fcmTokens[0]
    };

    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `key=${authKey}` },
    };

    fetch(url, fetchOptions)
      .then(res => {
        if (res.status == 200) {
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$WALA&&&&&&&&&&&&&&&&&&&&&");
        }
      })
      .then((err) => {
        console.log("Error occurred while calling FCM APIs for notification ============================>>>>>>>>>>>>>>>>>>>>>>>");
      });
  }
};
