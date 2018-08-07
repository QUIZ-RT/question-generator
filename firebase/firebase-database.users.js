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
      //.orderByChild('isAdmin')
      //.equalTo(false)
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

  getAllUsers() {
    return this.getFirebaseData(`/users`);
  }

  getAdminAccessRequestedUsers() {
    return this.getFirebaseFilteredData('users');
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
            this.pushFcmNotification(notificationType,userId, name, targettedAdminFcmToken);
          }
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }

  pushFcmNotification(notificationType , userId,name, fcmToken) {
    let url = "https://fcm.googleapis.com/fcm/send";
    let authKey = "AAAAwHJ-MXA:APA91bHB6sWt89fC4q2-9oRZC_NqQvtujbM4-S-hLxLcUsnjPb6uJ9qkVA5tfQ2bq1zY5v25X6yqVQddir_2eWMxsineiu9v3xZw3FUmSawNQblcaQgpOkMzFD8anUkABBrEkpIHxSqoH6PW6w-KVsH6ERLJqEoZBA";
    let payload = {
      "notification": {
        "title": name,
        "body": name+ " has requested admin access. Click to grant access",
        "click_action": "#accessRequests"
      },
      "to": fcmToken
    };

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
