import { MDCTopAppBar } from '@material/top-app-bar/index';
import QuestionController from './controllers/questionController';
import '../scss/main.scss';
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
new MDCTopAppBar(topAppBarElement);
const questionController = new QuestionController();
console.log(questionController);
