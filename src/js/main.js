
import QuestionController from './controllers/questionController';


require('../scss/main.scss');
// require('../js/firebase-messaging-sw.js');
require('./fcm-notification.js');

const questionController = new QuestionController();
console.log(questionController);
