import TopicManagerController from '../controllers/topicManagerController';
import UserController from '../controllers/userController';
import { QuestionManagerController } from '../controllers/questionManagerController';
import SearchQuestionController from '../controllers/searchQuestionController';

export function loadScreenRoute(screenName) {
  switch (screenName) {
    case 'questionManager':
      new SearchQuestionController();
      break;

    case 'topicManager':
      new TopicManagerController();
      break;
    case 'questionGenerator':
      QuestionManagerController.prototype.delegateWizardViewRequest();
      break;
    case 'accessRequests': {
      const userController = new UserController();
      userController.init();
      break;
    }
    default:
      console.log('oh');
  }
}
