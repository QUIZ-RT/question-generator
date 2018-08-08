import jQuery from 'jquery';
import { MDCTemporaryDrawer } from '@material/drawer';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import { loadScreenRoute } from './shared/routes';
import authEventListener from './authentication';
import reduxSubsCriber from './redux.subscribe';

require('./controllers/initController');
require('@material/top-app-bar/index');
require('./controllers/questionManagerController');
require('./fcm-notification.js');
require('./AjaxSetting');

const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('.menu').addEventListener('click', () => { drawer.open = true; });

export function loadScreen(screen) {
  loadScreenRoute(screen);
}
jQuery(document).ready(() => {
  jQuery('.navScreen').on('click', (e) => {
    const current = e.currentTarget;
    loadScreenRoute(jQuery(current).attr('data-screen'));
    drawer.open = false;
  });

  jQuery('.mdc-top-app-bar__title').on('click', (e) => {
    window.location.href = '/';
  });

  reduxSubsCriber();
  // Commented as it is showing duplicate initialization.
  authEventListener();
});
