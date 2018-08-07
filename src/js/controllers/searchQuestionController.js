import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';
import QuestionSearchDisplayService from '../services/questionSearchDisplayService';
import { } from './topicManagerController';
import {loadDropdownAndButton,populateDropDownValues,showQuestionsByTopic} from '../views/searchQuestions';

 class SearchQuestionController {

  constructor() {
    this.topics = {};
     this.questions = {};
     this.filteredQuestions=[];
debugger;
    this.questionSearchDisplayService = new QuestionSearchDisplayService();
    this.addDropdownAndBUtton();
     this.getAllTopicz();
 
    //  jQuery('.searchQuestionOnTopicBtn').on('click', () => {
    //     this.populateDropdown();
    //   });

      jQuery('#topicDropDown').on('click', () => {
        debugger;
        const topicValue = $('#dropDownButton')[0].outerText;
        if(topicValue){     
          this.displayQuestionOnTopicBasis(topicValue);
        }
        
      });
  }
  
  addDropdownAndBUtton() {   
    jQuery('#mainContainer').empty();
    const dropDOwnAndButton = loadDropdownAndButton();
    jQuery('#mainContainer').append(dropDOwnAndButton);
  }

  getAllTopicz() {
  this.topicList = {};
  this.questionSearchDisplayService.getTopicz()
    .then((data) => {
    //   for (let i = 0; i < data.length; i++) {
    //     console.log(data[i]);
    //     if (!data[i]) {
    //       data.splice(i, 1);
    //     }      
    // }    
      this.topics = data;
     const dropDownSelectedValue =  populateDropDownValues(this.topics); 
    }).catch((err) => {
      console.log(err);
    });
}

displayQuestionOnTopicBasis(selectedTopic){
  // Display Questions on basis of topic
 
  this.questionSearchDisplayService.getQuestionsOnTopicBasis(selectedTopic)
    .then((data) => {      
      var myData = [];
      for(var qKey in data){
       var ques = data[qKey];
       ques.qid = qKey;
        myData.push(ques);
      }
    
  showQuestionsByTopic(myData);
    }).catch((err) => {
      console.log(err);
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
        createdBy: 'Pallavi Jain',
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

  render(data) {
    const template = topic(data);
    jQuery('#topic-ul').remove();
    jQuery('#topicManagerContainer').append(template);
  }
}

export default SearchQuestionController;