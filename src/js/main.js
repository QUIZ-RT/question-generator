import QuestionController from './controllers/questionController';

// import { callGoogleSignIn } from '../../firebase/firebase-signin';
import 'popper.js';
import 'bootstrap';
import '../scss/main.scss';
import './AjaxSetting';

const jQuery = require('jquery');
require('./controllers/questionManagerController');
require('../scss/main.scss');

const questionController = new QuestionController();
console.log(questionController);
/* for login
callGoogleSignIn();
function retriveData(responseData) {
  console.log(responseData);
}
*/
const topic = {
  id: "987654",
  "createdBy": "sachin kumar jain",
  "createdDate": "02-08-2018",
  "modifiedBy": "sachin kumar jain",
  "modifiedDate": "02-08-2018",
  "published": true,
  "topicText": "Education",
  "topicUrl": "Education/img"
}
jQuery(document).ready(() => {
  jQuery.ajax({
    type: "post",
    contentType: 'application/json',
    dataType: "json",
    url: "/firebase/api/topics",
    data: JSON.stringify(topic)
  }).done(function (response) {
    console.log(response)
  }).fail(function (jqXhr) {
    console.log(jqXhr);
  });
  jQuery.ajax({
    type: "get",
    contentType: 'application/json',
    dataType: "json",
    url: "/firebase/api/topics",
  }).done(function (response) {
    console.log(response)
  }).fail(function (jqXhr) {
    console.log(jqXhr);
  });
});
