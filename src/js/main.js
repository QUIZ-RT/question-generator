import jQuery from 'jquery';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util } from '@material/drawer';
import QuestionController from './controllers/questionController';
import { loadScreenRoute } from './shared/routes';

// import { callGoogleSignIn } from '../../firebase/firebase-signin';
import { getQuestions, getTopics } from '../../firebase/firebase-database';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';

require('./controllers/questionManagerController');
// require('./fcm-notification.js');

const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('.menu').addEventListener('click', () => { drawer.open = true; });

export function loadScreen(screen) {
  loadScreenRoute(screen);
}
jQuery(document).ready(() => {
  jQuery.ajax({
    type: 'post',
    contentType: 'application/json',
    dataType: 'json',
    url: '/firebase/api/topics',
    data: JSON.stringify(topic),
  }).done((response) => {
    console.log(response);
  }).fail((jqXhr) => {
    console.log(jqXhr);
  });

//   jQuery.ajax({
//     type: 'post',
//     contentType: 'application/json',
//     dataType: 'json',
//     url: '/firebase/signin',
//   }).done((response) => {
//     console.log(response);
//   }).fail((jqXhr) => {
//     console.log(jqXhr);
//   });
});

jQuery('.navScreen').on('click', (e) => {
  const current = e.currentTarget;
  loadScreenRoute(jQuery(current).attr('data-screen'));
});
