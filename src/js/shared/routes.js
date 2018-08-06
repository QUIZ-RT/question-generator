import TopicManagerController from '../controllers/topicManagerController';
import UserController from '../controllers/userController';

export function loadScreenRoute(screenName) {
  switch (screenName) {
    case 'questionManager':

      break;
    case 'topicManager':
      new TopicManagerController();
      break;
    case 'questionGenerator':
      break;
    case 'accessRequests':
      let userController = new UserController();
      userController.init();
      break;
    default:
      console.log('oh');
  }
}
