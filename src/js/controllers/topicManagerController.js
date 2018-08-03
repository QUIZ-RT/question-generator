import TopicManagerService from '../services/topicManagerService';
import { topic } from '../views/topic';

class TopicManagerController {
  constructor() {
    this.topicManagerService = new TopicManagerService();
    this.getAllTopics();
  }

  getAllTopics() {
    this.topicManagerService.getTopics()
      .then((data) => {
        console.log(data);
        render(data);
      }).catch((err) => {
        console.log(err);
      });
  }
}

function render(data) {
  // console.log(data);
  for (const topic in data) {
    console.log(topic);
  }
  jQuery('#mainContainer').empty();
  const template = topic();
  jQuery('#mainContainer').append(template);
}

export default TopicManagerController;
