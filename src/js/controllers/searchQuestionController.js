import QuestionSearchDisplayService from '../services/questionSearchDisplayService';
import { loadDropdownAndButton, populateDropDownValues, showQuestionsByTopic } from '../views/searchQuestions';

class SearchQuestionController {

  constructor() {
    let self= this;
    this.topics = {};
    this.questions = {};
    this.filteredQuestions = [];
    this.questionSearchDisplayService = new QuestionSearchDisplayService();
    this.addDropdownAndBUtton();
    this.getAllTopicz();

    jQuery('#topicDropDown').on('click', () => {
      const topicValue = $('#dropDownButton')[0].outerText;
      if (topicValue) {
        this.displayQuestionOnTopicBasis(topicValue);
        //this.updateQuestion(newQuesObj);
      }
    });

//Update Ques changes starts
 $(document).on('click', '#btnQUSubmitQuestions',  function() {
  //jQuery('#btnQUSubmitQuestions').on('click', () => {
  debugger;
  var ques =   $('#exampleInputQuestion')[0].value;
  var ans =  $("#exampleInputAnswer")[0].value;
    var opt1 = $("#opt1")[0].value;
    var opt2 = $("#opt2")[0].value;
    var opt3 = $("#opt3")[0].value;
    var opt4 = $("#opt4")[0].value;

    var topic = $("#topicIdTextbox")[0].value;
    var questionId = $("#quesIdTextbox")[0].value;
    debugger;   
  let newQuesObj = {};
  let tempObj = {}
  tempObj["opt1"] = opt1;
  tempObj["opt2"] = opt2;
  tempObj["opt3"] = opt3;
  tempObj["opt4"] = opt4;
  //newQuesObj.answer = ans;
  if(ans==opt1){
    newQuesObj.answer = "opt1";
  }else if(ans==opt2){
    newQuesObj.answer = "opt2";
  }else if(ans==opt3){
    newQuesObj.answer = "opt3";
  }else if(ans==opt4){
    newQuesObj.answer = "opt4";
  }else{
    newQuesObj.answer = "None Of These";
  }
  
  newQuesObj.options = tempObj;
  newQuesObj.question=ques;
  newQuesObj.topic = topic;
  newQuesObj.id = questionId;
  self.updateQuestion(newQuesObj);
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
        this.topics = data;
        const dropDownSelectedValue = populateDropDownValues(this.topics);
      }).catch((err) => {
        console.log(err);
      });
  }

  displayQuestionOnTopicBasis(selectedTopic) {
    this.questionSearchDisplayService.getQuestionsOnTopicBasis(selectedTopic)
      .then((data) => {
        const myData = [];
        for (const qKey in data) {
          const ques = data[qKey];
          ques.qid = qKey;
          myData.push(ques);
        }

        showQuestionsByTopic(myData);
      }).catch((err) => {
        console.log(err);
      });
  }

updateQuestion(newQuesObj){
let topicOfQues = newQuesObj.topic;
this.questionSearchDisplayService.updateQuestionInDB(newQuesObj)
.then((data) => {
  debugger;
  console.log('updated question is ', data);

  $('#btnQUCancelConfirm').trigger('click');

   this.displayQuestionOnTopicBasis(topicOfQues);
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
