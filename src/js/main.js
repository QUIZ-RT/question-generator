
import QuestionController from './controllers/questionController';

// import { callGoogleSignIn } from '../../firebase/firebase-signin';
import { getQuestions, getTopics } from '../../firebase/firebase-database';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';

require('./controllers/questionManagerController');
require('../scss/main.scss');


const questionController = new QuestionController();
console.log(questionController);
// for login
// callGoogleSignIn();
function retriveData(responseData) {
  console.log(responseData);
}
getQuestions(null, retriveData);
getTopics(null, retriveData);
