
import firebaseinit from 'firebase';
import firebaseClient from './shared/firebase.client.config';

require('firebase/auth');

const provider = new firebaseinit.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function signInWithPopup(callback) {
  firebaseClient.auth().signInWithPopup(provider).then((result) => {
    if (result.credential && result.user) {
      callback(result.user);
    }
  }).catch((error) => {
    console.log(error);
  });
}

// sign in method
function googleSignIn(callback) {
  signInWithPopup(callback);
}

function signOutApplication(callback) {
  firebaseClient.auth().signOut().then(() => {
    callback('logout');
  }).catch((error) => {
    console.log(error);
  });
}
// eventlistener start
function togglelogin(response) {
  jQuery('#sideBarButton,#mainContent').toggleClass('d-none');
  console.log(response);
  if (response) {
    const haedSection = `<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar" id='rightHead'>
          <a href="#" class=" mdc-top-app-bar__action-item" alt="user Profile"><img src='${response.photoURL}' class='mr-1'  alt='user profile'/>${response.displayName}</a>
          <a href="#" class=" mdc-top-app-bar__action-item" alt="logOut" id="userLogout">
              <i class="fa fa-sign-out mr-1"></i>LogOut</a>
              </section> `;
    jQuery('#headSection').append(haedSection);
  } else {
    jQuery('#headSection').find('#rightHead').remove();
    jQuery('#mainContent').toggleClass('d-none');
  }
}
function addCurrentUser(postUserData) {
  jQuery.ajax({
    type: 'post',
    contentType: 'application/json',
    dataType: 'json',
    url: '/firebase/users',
    data: JSON.stringify(postUserData),
  }).done((response) => {
    togglelogin(response);
  }).fail((jqXhr) => {
    console.log(jqXhr);
  });
}
function checkUserIsAbailable(userData) {
  jQuery.ajax({
    type: 'get',
    contentType: 'application/json',
    dataType: 'json',
    url: `/firebase/users/${userData.id}`,
  }).done((response) => {
    if (response) {
      togglelogin(response);
    } else {
      addCurrentUser(userData);
    }
  }).fail((jqXhr) => {
    console.log(jqXhr);
  });
}
function updateHeader(userData) {
  if (userData) {
    const {
      displayName, email, photoURL, uid,
    } = userData;
    checkUserIsAbailable({
      displayName, email, photoURL, id: uid, isAdmin: false, isUserBlocked: false,
    });
  } else {
    togglelogin();
  }
}

function authEventListener() {
  jQuery('body').on('click', '#loginWithGoogle', () => {
    googleSignIn(updateHeader);
  });
  jQuery('body').on('click', '#userLogout', () => {
    signOutApplication(updateHeader);
  });
}

export default authEventListener;
