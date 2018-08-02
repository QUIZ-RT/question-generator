
const firebase = require('firebase/app');
const firebaseInit = require('./firebase');

require('firebase/auth');

function signInWithPopup(provider, resolve, reject) {
  firebaseInit.auth().signInWithPopup(provider).then((result) => {
    if (result.credential && result.user) {
      resolve(result.user);
    }
  }).catch((error) => {
    reject(error)
  });

  firebaseInit.auth().getRedirectResult().then((result) => {
    if (result.credential && result.user) {
      resolve(result.user);
    }
  }).catch((error) => {
    reject(error)
  });
}
// sign in method
module.exports = class firebaseSignIn {
  callGoogleSignIn(resolve, reject) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(provider, resolve, reject);
  };

  signOutApplication(resolve, reject) {
    firebaseInit.auth().signOut().then((data) => {
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  };
}
