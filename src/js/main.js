import jQuery from 'jquery';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util } from '@material/drawer';
// import { callGoogleSignIn } from '../../firebase/firebase-signin';
import { getQuestions, getTopics } from '../../firebase/firebase-database';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';

require('./controllers/initController');
require('./fcm-notification.js');

const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('.menu').addEventListener('click', () => { drawer.open = true; });

jQuery(document).ready(() => {
  jQuery.ajax({
    type: 'post',
    contentType: 'application/json',
    dataType: 'json',
    url: '/firebase/signin',
  }).done((response) => {
    console.log(response);
  }).fail((jqXhr) => {
    console.log(jqXhr);
  });
});
