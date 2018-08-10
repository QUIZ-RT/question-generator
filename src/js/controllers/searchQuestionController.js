import QuestionSearchDisplayService from '../services/questionSearchDisplayService';

class SearchQuestionController {

  constructor() {
    let self= this;
    this.topics = {};
    this.questions = {};
    this.filteredQuestions = [];
    this.questionSearchDisplayService = new QuestionSearchDisplayService();
    this.questionSearchDisplayService.addDropdownAndBUtton();

 $(document).on('click', '#btnQUSubmitQuestions',  function() {
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
self.questionSearchDisplayService.updateQuestion(newQuesObj);
});

  }

  // render(data) {
 
  // }
}

export default SearchQuestionController;
