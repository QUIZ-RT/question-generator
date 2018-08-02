const firebase = require('firebase/app');
const firebaseInit = require('./firebase');

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
        resolve('SuccessFully');
      }
    });
  }

  updateFirebaseData(refUrl, postDataObj, resolve, reject) {
    firebaseInit.database().ref(refUrl).update(postDataObj, (error) => {
      if (error) {
        reject('there is some issue we will come back sortly');
      } else {
        resolve('SuccessFully');
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

};
