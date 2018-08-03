import TopicManagerController from '../controllers/topicManagerController';

export function loadScreenRoute(screenName) {
  switch (screenName) {
    case 'questionManager':

      break;
    case 'topicManager':
      new TopicManagerController();
      break;
    case 'questionGenerator':

      break;
    default:
      console.log('oh');
  }
}
