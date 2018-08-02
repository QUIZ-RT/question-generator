
const firebase = require('firebase/app');
const firebaseInit = require('./firebase');

require('firebase/auth');

const firebaseDatabase = require('./firebase-database');
const firebaseFunc = new firebaseDatabase();

function signInWithPopup(provider, callback) {
  firebaseInit.auth().signInWithPopup(provider).then((result) => {
    if (result.credential && result.user) {
      const token = result.credential.accessToken;
      const {
        displayName, email, photoURL, uid,
      } = result.user;
      firebaseFunc.seveLoggedUserInfo(uid, {
        displayName, email, photoURL, token,
      });
      // call update ui method after login
      callback(result.user);
    }
  });
}
firebaseInit.auth().getRedirectResult().then((result) => {
  if (result.credential && result.user) {
    const token = result.credential.accessToken;
    const {
      displayName, email, photoURL, uid,
    } = result.user;
    firebaseFunc.seveLoggedUserInfo(uid, {
      displayName, email, photoURL, token,
    });
  }
}).catch((error) => {
  console.log(error);
});


// sign in method
module.exports = () => {
  callGoogleSignIn = (callback) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(provider, callback);
  };

  signOutApplication = (callback) => {
    firebaseInit.auth().signOut().then(() => {
      callback();
    }).catch((error) => {
      console.log(error);
    });
  };
}
