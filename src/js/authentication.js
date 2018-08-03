const firebase = require('firebase/app');
require('firebase/auth');

firebase.initializeApp({
  apiKey: 'AIzaSyCYbFTLJktjYHMsK7Nx_m3UMJsw2Nq0O4Y',
  authDomain: 'quizgenx-884f0.firebaseapp.com',
  databaseURL: 'https://quizgenx-884f0.firebaseio.com',
  projectId: 'quizgenx-884f0',
  storageBucket: 'quizgenx-884f0.appspot.com',
  messagingSenderId: '826554593648',
});

const provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function signInWithPopup(callback) {
  firebase.auth().signInWithPopup(provider).then((result) => {
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
  firebase.auth().signOut().then(() => {
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
    jQuery('#userImg').html(`<img src='${response.photoURL}'  alt='user profile'/>`);
    jQuery('#userDispalyName').html(` <a class='nav-link'><i class="fa fa-user mr-1"></i>${response.displayName}<a> `);
  } else {
    jQuery('#userProfile').html('');
    jQuery('#userDispalyName').html('');
  }
}
function addCurrentUser(postUserData) {
  jQuery.ajax({
    type: 'post',
    contentType: 'application/json',
    dataType: 'json',
    url: '/firebase/api/users',
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
    url: `/firebase/api/users/${userData.id}`,
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
  if (userData !== 'logout') {
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
