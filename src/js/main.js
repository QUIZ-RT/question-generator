import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';
import authEventListener from './authentication';

require('../scss/main.scss');

jQuery(document).ready(() => {
  authEventListener();
});
