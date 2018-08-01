import QuestionController from './controllers/questionController';
require('./controllers/questionManagerController');
require('../scss/main.scss');
require('../scss/style.scss');

const questionController = new QuestionController();
// console.log(questionController);

import { callGoogleSignIn } from '../../firebase/firebase-signin';

import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';

const questionController = new QuestionController();
console.log(questionController);
// for login
callGoogleSignIn();
