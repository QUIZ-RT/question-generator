import jQuery from 'jquery';
import { MDCTemporaryDrawer } from '@material/drawer';
import UserController from './controllers/userController';

import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';

// import './AjaxSetting';

import { loadScreenRoute } from './shared/routes';
import authEventListener from './authentication';
import reduxSubsCriber from './redux.subscribe';
import loginpageHtml from './views/loginForm';

require('@material/top-app-bar/index');
require('./controllers/questionManagerController');
require('./fcm-notification.js');

const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('.menu').addEventListener('click', () => { drawer.open = true; });


document.querySelector('#RequestAccessBtn').addEventListener('click', (e) => {
  const _userController = new UserController();
  _userController.updateAccessRequest();
});


export function loadScreen(screen) {
  loadScreenRoute(screen);
}
jQuery(document).ready(() => {
  jQuery('#mainContent').html(loginpageHtml);
  jQuery('.navScreen').on('click', (e) => {
    const current = e.currentTarget;
    loadScreenRoute(jQuery(current).attr('data-screen'));
  });
  reduxSubsCriber();
  // Commented as it is showing duplicate initialization. Refer the Firebase config and initialize only once
  authEventListener();
});
