import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';
import TopicManagerService from '../services/topicManagerService';
import Constants from '../shared/constants';
import store from '../redux/redux.store';
import {
  topic, loadButtons, addTopicDialog, openConfirmation,
} from '../views/topic';

class TopicManagerController {
  constructor() {
    this.topics = {};
    this.total = 0;
    this.startIndex = 0;
    this.limit = Constants.TOPIC_PAGING_LIMIT;
    this.topicManagerService = new TopicManagerService();

    this.addButtons();
    this.getAllTopics();
    store.subscribe(() =>{
      const currentState = store.getState();
      if(currentState.actionType == 'ADD_TOPIC' || 
      currentState.actionType == 'UPDATE_TOPIC' || currentState.actionType == 'DELETE_TOPIC'){
        this.render(currentState.topics);
      }
    });
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
      for (let i = 0; i < this.topics.length; i += 1) {
        if (Number(topicId) === this.topics[i].id) {
          const selectTopic = this.topics[i];
          this.addEditTopic(selectTopic);
          break;
        }
      }
    });
    this.attachListner();
  }

  attachListner() {
    jQuery('#mainContainer').on('click', '.nextTopic', (e) => {
      if (this.total > this.startIndex) {
        this.startIndex = this.startIndex + this.limit + 1;
        console.log('next', this.startIndex);
        this.getAllTopics();
      }
    });
    jQuery('#mainContainer').on('click', '.prevTopic', (e) => {
      if (this.startIndex > 0) {
        this.startIndex = this.startIndex - this.limit - 1;
        console.log('prev', this.startIndex);
        this.getAllTopics();
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
    let topicId = 0;
    let actionType = 'ADD_TOPIC'
    //let order = 0;
    if (!selectTopic) {
      for (const topicObj in this.topics) {
        const topicData = this.topics[topicObj];
        topicIds.push(topicData.id);
      }
      topicId = topicIds.reduce((maxId, id) => Math.max(id, maxId), -1) + 1;
    } else {
      topicId = selectTopic.id;
      actionType = 'UPDATE_TOPIC';
      //order = this.topics[topicId].order
    }
    this.total += 1;
    if (topicTxt) {
      const topicObj = {
        createdBy: window.localStorage.displayName,
        createdDate: new Date(),
        modifiedDate: new Date(),
        published: true,
        topicText: topicTxt,
        topicUrl: jQuery('.mdc-text-field-topic-url input').val().trim(),
        id: topicId,

      };
      // if(!topicObj.topicUrl){
      //   topicObj.topicUrl = './assets/no-image.png'
      // }
      store.dispatch({
        type: actionType,
        'topic':topicObj
      });
      this.topicManagerService.saveTopic(topicObj)
        .then((data) => {
          console.log('saved', data);
          
            // this.getAllTopics();

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
    store.dispatch({
      type: 'DELETE_TOPIC',
      'topic':topicObj
    });
    this.topicManagerService.deleteTopic(topicObj)
      .then((data) => {
        console.log('deleted', data);
        // this.getAllTopics();
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
    // store.dispatch({
    //   type: 'DELETE_ALL_TOPICS',
    //   'topics':[]
    // });
    
    this.topicManagerService.getTopics()
      .then((data) => {
        if(data){
          const length = data.length;
        for (let i = 0; i < length; i++) {
          if (!data[i] && data.length > i) {
            data.splice(i, 1);
            i--;
          }//else{
            // if(!data[i].topicUrl){
            //   data[i].topicUrl = './assets/no-image.png'
            // }
          // }
        }

        //save to redux state
        store.dispatch({
          type: 'ADD_ALL_TOPICS',
          'topics':data
        });
        this.topics = data;
        this.render(data);
      }
      }).catch((err) => {
        console.log(err);
      });
  }

   render(data) {
    this.topics = data;
    const template = topic(data);
    jQuery('#topic-ul').remove();
    jQuery('#topicListWrapper').prepend(template);
  }
}


// document.querySelector('#default-dialog-activation').addEventListener('click', (evt) => {
//   dialog.lastFocusedTarget = evt.target;
//   dialog.show();
// });
export default TopicManagerController;
