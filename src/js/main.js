import jQuery from 'jquery';
import { MDCTemporaryDrawer } from '@material/drawer';
import { loadScreenRoute } from './shared/routes';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';
import authEventListener from './authentication';

require('@material/top-app-bar/index');
require('./controllers/questionManagerController');
// require('./fcm-notification.js');

const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('.menu').addEventListener('click', () => { drawer.open = true; });

export function loadScreen(screen) {
  loadScreenRoute(screen);
}
jQuery(document).ready(() => {
  jQuery('.navScreen').on('click', (e) => {
    const current = e.currentTarget;
    loadScreenRoute(jQuery(current).attr('data-screen'));
  });

  authEventListener();
});
