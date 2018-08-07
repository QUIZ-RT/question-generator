import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';
import TopicManagerService from '../services/topicManagerService';
import {
  topic, loadButtons, addTopicDialog, openConfirmation,
} from '../views/topic';

class TopicManagerController {
  constructor() {
    this.topics = {};
    this.topicManagerService = new TopicManagerService();

    this.addButtons();
    this.getAllTopics();
    this.dialog;
    jQuery('.addTopicBtn').on('click', () => {
      this.addEditTopic();
    });
    jQuery('#mainContainer').on('click', '.deleteTopicBtn', (e) => {
      const topicId = jQuery(e.currentTarget).attr('data-id');
      this.openConfirmationModal(topicId);
    });

    jQuery('#mainContainer').on('click', '.editTopicBtn', (e) => {
      const topicId = jQuery(e.currentTarget).attr('data-id');
      for (let i = 0; i < this.topics.length; i++) {
        if (Number(topicId) == this.topics[i].id) {
          const selectTopic = this.topics[i];
          this.addEditTopic(selectTopic);
          break;
        }
      }
    });
  }

  openConfirmationModal(topicId) {
    // my-mdc-dialog-delete-confirm
    $('#dialogContainer').append(openConfirmation());
    this.dialog = new MDCDialog(document.querySelector('#my-mdc-dialog-delete-confirm'));
    this.dialog.show();
    this.dialog.listen('MDCDialog:accept', () => {
      this.deleteTopic(topicId);
      $('#dialogContainer').empty();
    });

    this.dialog.listen('MDCDialog:cancel', () => {
      console.log('canceled');
      $('#dialogContainer').empty();
    });
  }

  addEditTopic(selectTopic) {
    $('#dialogContainer').append(addTopicDialog(selectTopic));

    this.dialog = new MDCDialog(document.querySelector('#my-mdc-dialog'));
    this.topicField = new MDCTextField(document.querySelector('.mdc-text-field-topic'));
    this.topicUrlField = new MDCTextField(document.querySelector('.mdc-text-field-topic-url'));

    this.dialog.show();
    this.dialog.listen('MDCDialog:accept', () => {
      this.saveNewTopic(selectTopic);
      $('#dialogContainer').empty();
    });

    this.dialog.listen('MDCDialog:cancel', () => {
      console.log('canceled');
      $('#dialogContainer').empty();
    });
  }

  saveNewTopic(selectTopic) {
    const topicTxt = jQuery('.mdc-text-field-topic input').val().trim();
    const topicIds = [];
    let topicId;
    if (!selectTopic) {
      for (const topicObj in this.topics) {
        const topicData = this.topics[topicObj];
        topicIds.push(topicData.id);
      }
      topicId = topicIds.reduce((maxId, topic) => Math.max(topic, maxId), -1) + 1;
    } else {
      topicId = selectTopic.id;
    }
    if (topicTxt) {
      const topicObj = {
        createdBy: window.localStorage.displayName,
        createdDate: new Date(),
        modifiedDate: new Date(),
        published: true,
        topicText: topicTxt,
        topicUrl: jQuery('.mdc-text-field-topic-url input').val(),
        id: topicId,
      };
      this.topicManagerService.saveTopic(topicObj)
        .then((data) => {
          console.log('saved', data);
          this.getAllTopics();
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  deleteTopic(topicId) {
    const topicObj = {
      id: topicId,
    };
    this.topicManagerService.deleteTopic(topicObj)
      .then((data) => {
        console.log('deleted', data);
        this.getAllTopics();
      }).catch((err) => {
        console.log(err);
      });
  }

  addButtons() {
    jQuery('#mainContainer').empty();
    const btns = loadButtons();
    jQuery('#mainContainer').append(btns);
  }

  getAllTopics() {
    this.topicList = {};
    this.topicManagerService.getTopics()
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (!data[i]) {
            data.splice(i, 1);
          }
        }
        console.log(data);
        this.topics = data;
        this.render(data);
      }).catch((err) => {
        console.log(err);
      });
  }

  render(data) {
    const template = topic(data);
    jQuery('#topic-ul').remove();
    jQuery('#topicManagerContainer').append(template);
  }
}


// document.querySelector('#default-dialog-activation').addEventListener('click', (evt) => {
//   dialog.lastFocusedTarget = evt.target;
//   dialog.show();
// });
export default TopicManagerController;
