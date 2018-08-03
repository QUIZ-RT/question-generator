import TopicManagerService from '../services/topicManagerService';
import { topic, loadButtons } from '../views/topic';

class TopicManagerController {
  constructor() {
    this.topicManagerService = new TopicManagerService();
    this.addButtons();
    this.getAllTopics();
  }

  addButtons() {
    jQuery('#mainContainer').empty();
    const btns = loadButtons();
    jQuery('#mainContainer').append(btns);
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
  const template = topic(data);
  jQuery('#topicManagerContainer').append(template);
}

export default TopicManagerController;
