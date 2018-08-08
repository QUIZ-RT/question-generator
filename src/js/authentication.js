
import firebaseinit from 'firebase';
import firebaseClient from './shared/firebase.client.config';
import quizGeneratorHtml from './views/quizGenerator';
import loginpageHtml from './views/loginForm';
import UserService from './services/userService';

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
function clearLocalStorage() {
  localStorage.clear();
}

function signOutApplication(callback) {
  clearLocalStorage();
  firebaseClient.auth().signOut().then(() => {
    callback('logout');
  }).catch((error) => {
    console.log(error);
  });
}

function setNotificationCount() {
  const notifications = JSON.parse(localStorage.getItem('notifications'));
  let count = 0;
  if (notifications) count = notifications.length;
  jQuery('#notification_count').text(count);
}
function loadNotifications() {
  jQuery('#notification-dropdown-body').html('');
  const notifications = JSON.parse(localStorage.getItem('notifications'));
  if (!notifications) {
    const notificationBlankTemplate = `<div class="notification new" >
    <div class="notification-image-wrapper">
      <div class="notification-image">
        <span> Oops :  </span>
      </div>
    </div>
    <div class="notification-text">
       <span class="highlight"></span>No more notifications received
    </div>
  </div>`;
    jQuery('#notification-dropdown-body').append(notificationBlankTemplate);
  } else {
    notifications.forEach((notification) => {
      const notificationTemplate = `<div class="notification new" >
    <div class="notification-image-wrapper">
      <div class="notification-image">
        <span>${notification.type} </span>
      </div>
    </div>
    <div class="notification-text">
       <span class="highlight"></span> ${notification.content}
    </div>
  </div>`;
      jQuery('#notification-dropdown-body').append(notificationTemplate);
    });
  }
}

// eventlistener start
function togglelogin(response) {
  if (response) {
    jQuery('#mainContainer').html(quizGeneratorHtml);

    jQuery('#btnMenu').show();

    const userService = new UserService();
    userService.getLocalAccessToken(response.id, response.email)
      .then((tokenData) => {
        console.log(tokenData);
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('isAdmin', tokenData.isAdmin);
        localStorage.setItem('displayName', tokenData.displayName);
        localStorage.setItem('email', response.email);
        localStorage.setItem('photoURL', response.photoURL);
        jQuery('#sideBarButton').toggleClass('d-none');
        console.log(response.accessToken);
        if (tokenData.isAdmin) {
          jQuery('#btnREquestAdminAccess').hide();
        }

        jQuery('#mainContainer').on('click', '#btnREquestAdminAccess', (e) => {
          const userId = localStorage.getItem('userId');
          const name = localStorage.getItem('displayName');
          userService.updateAccessRequest(userId, name);
        });

        const haedSection = `
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar" id='rightHead'>
          <a href="#" class=" mdc-top-app-bar__action-item" alt="user Profile"><img src='${response.photoURL}' class='mr-1'  alt='user profile'/>${response.displayName}</a>
         
          <div class="dropdowns-wrapper">
		          <div class="dropdown-container">
		            <div class="notifications dropdown dd-trigger" id="showNotifications">
                <a href="#" class=" mdc-top-app-bar__action-item" alt="notification" id="Notification">
                <i class="fa fa-bell mr-1"></i>
                <span id="notification_count">
                    0
                </span>              
            </a>
		            </div>
		            <div class="dropdown-menu animated" id="notification-dropdown">
		              <div class="dropdown-header">
		                <span class="triangle"></span>
		                <span class="heading">Notifications</span>
		                <span class="count" id="dd-notifications-count">{{newNotifications.length}}</span>
		              </div>
		              <div id="notification-dropdown-body" class="dropdown-body">
		                
		              </div>
		            </div>
		          </div> 
		        </div>
          <a href="#" class=" mdc-top-app-bar__action-item" alt="logOut" id="userLogout">
          <i class="fa fa-sign-out mr-1"></i>LogOut</a>
        </section> `;

        jQuery('#headSection').append(haedSection);

        jQuery('#headSection').on('click', '#showNotifications', (e) => {
          loadNotifications();
          jQuery('#notification-dropdown').toggle();
          localStorage.removeItem('notifications');
          setNotificationCount();
        });

        loadNotifications();
        setNotificationCount();
      });
  } else {
    jQuery('#headSection').find('#rightHead').remove();
    jQuery('#mainContainer').html(loginpageHtml);
    jQuery('#btnMenu').hide();
  }
}
function addCurrentUser(postUserData) {
  localStorage.setItem('userId', postUserData.id);
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
  localStorage.setItem('userId', userData.id);
  jQuery.ajax({
    type: 'get',
    contentType: 'application/json',
    dataType: 'json',
    url: `/firebase/users/${userData.id}`,
  }).done((response) => {
    if (response && response.email) {
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

jQuery(document).ready(() => {
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userId');
  const displayName = localStorage.getItem('displayName');
  const photoURL = localStorage.getItem('photoURL');
  const response = {
    email,
    id: userId,
    displayName,
    photoURL,
  };
  if (email) {
    togglelogin(response);
  } else {
    togglelogin(null);
  }
});
export default authEventListener;
