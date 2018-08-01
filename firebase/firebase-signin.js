import firebase from 'firebase/app';
import firebaseInit from './firebase';
import 'firebase/auth';
import { saveCurrentLoggedUserInfo } from './firebase-database';

function signInWithPopup(provider) {
  firebaseInit.auth().signInWithPopup(provider).then((result) => {
    if (result.credential && result.user) {
      const token = result.credential.accessToken;
      const {
        displayName, email, photoURL, uid,
      } = result.user;
      saveCurrentLoggedUserInfo(uid, {
        displayName, email, photoURL, token,
      });
      // call update ui method after login
      console.log(result.user);
    }
  });
}
firebaseInit.auth().getRedirectResult().then((result) => {
  if (result.credential && result.user) {
    const token = result.credential.accessToken;
    const {
      displayName, email, photoURL, uid,
    } = result.user;
    saveCurrentLoggedUserInfo(uid, {
      displayName, email, photoURL, token,
    });
  }
}).catch((error) => {
  console.log(error);
});


// sign in method
export function signUp(email, password) {
  firebaseInit.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    console.log(error.code + error.message);
  });
}
export function signIn(email, password) {
  firebaseInit.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    console.log(error.code + error.message);
  });
}
export const callGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  signInWithPopup(provider);
};
export const signOutApplication = () => {
  firebaseInit.auth().signOut().then(() => {

  }).catch((error) => {
    console.log(error);
  });
};
