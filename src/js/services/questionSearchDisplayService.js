import { loadDropdownAndButton, populateDropDownValues, showQuestionsByTopic } from '../views/searchQuestions';

class DisplayQuestionTopicBasedService {

  constructor(){
let self= this;

            $(document).on('click', '.dropdown-item',  function(event) {
              debugger;
              let target = event.target;
              const selectedValue = target.innerHTML
              $('#dropDownButton').html(selectedValue);
              if (selectedValue) {    
                self.displayQuestionOnTopicBasis(selectedValue,0);
                }
            });

            $(document).on('click', '#nextPageButton', function () {
              console.log("Next Button CLicked");
              alert(" !!! NEXT BUTTON !!!");
              const selectedTopicValue = $('#dropDownButton')[0].outerText;
              debugger;
              if (selectedTopicValue) {
                self.displayQuestionOnTopicBasis(selectedTopicValue,1);
               }
            });

            $(document).on('click', '#previousPageButton', function () {
              console.log("Previous Button CLicked");
              alert(" !!! Previous BUTTON !!!");
              const selectedTopicValue = $('#dropDownButton')[0].outerText;
              debugger;
              if (selectedTopicValue) {
                self.displayQuestionOnTopicBasis(selectedTopicValue,-1);
               }
            });

  }
  getTopicz() {
    const authKey = localStorage.getItem('accessToken');
    console.log('getAllTopics in service');
    return jQuery.ajax({
      type: 'get',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topics',
      data: JSON.stringify({}),
    }).done(response => response).fail(jqXhr => jqXhr);
  }

  getQuestionsOnTopicBasis(topicSelected,displaypageNumber) {
    debugger;
    const authKey = localStorage.getItem('accessToken');
    let pageNumber = 1;
   
    if(displaypageNumber==1){
        const storedPageNumber =  localStorage.getItem('storePageNumber');        
        pageNumber = parseInt(localStorage.getItem('storePageNumber')) + 1;
        localStorage.setItem('storePageNumber',pageNumber);
        console.log("Next : " + pageNumber);
      }else if(displaypageNumber== -1){
        const storedPageNumber =  localStorage.getItem('storePageNumber');    
        pageNumber = parseInt(localStorage.getItem('storePageNumber'))  -  1;
        localStorage.setItem('storePageNumber',pageNumber);
        console.log("Previous : " + pageNumber);
      } else {
       localStorage.setItem('storePageNumber',pageNumber);
       console.log("PageLoad : " + pageNumber);
      }

    if(pageNumber==1){  
      if(document.getElementById("previousPageButton").classList.contains("visible")){
        document.getElementById("previousPageButton").classList.remove('visible');
        document.getElementById("previousPageButton").classList.add('invisible');
      }
      if(document.getElementById("nextPageButton").classList.contains("invisible")){
        document.getElementById("nextPageButton").classList.remove('invisible');
        document.getElementById("nextPageButton").classList.add('visible');
      }
    }

    if(pageNumber > 1){
      if(document.getElementById("previousPageButton").classList.contains("invisible")){
        document.getElementById("previousPageButton").classList.remove("invisible");
        document.getElementById("previousPageButton").classList.add('visible');
      }
      if(document.getElementById("nextPageButton").classList.contains("invisible")){
        document.getElementById("nextPageButton").classList.remove("invisible")
        document.getElementById("nextPageButton").classList.add('visible');
      }
    }
    
    
    
    const myUrl =`/firebase/api/questions/pagination/${topicSelected}/${pageNumber}`;
    return jQuery.ajax({
      type: 'get',
      contentType: 'application/json',
      dataType: 'json',
      url: myUrl,
      data: JSON.stringify({}),
    }).done(response => response).fail(jqXhr => jqXhr);
  }

  updateQuestionInDB(newQueObj){
    debugger;
    const promise = jQuery.ajax({
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/updateQuestion',  
      data: JSON.stringify(newQueObj),
    }).done(response => response).fail(jqXhr => jqXhr);
    debugger;
    return promise;
  }

//
addDropdownAndBUtton() {
  jQuery('#mainContainer').empty();
  const dropDOwnAndButton = loadDropdownAndButton();
  jQuery('#mainContainer').append(dropDOwnAndButton);
  this.getAllTopicz();
}


getAllTopicz() {
  this.topicList = {};
  //this.questionSearchDisplayService.getTopicz()
  this.getTopicz()
    .then((data) => {
      this.topics = data;
      const dropDownSelectedValue = populateDropDownValues(this.topics);
    }).catch((err) => {
      console.log(err);
    });
}

displayQuestionOnTopicBasis(selectedTopic,pageNumber) {
  debugger;
 this.getQuestionsOnTopicBasis(selectedTopic,pageNumber)
    .then((data) => {
      const myData = [];
      debugger;
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
this.updateQuestionInDB(newQuesObj)
.then((data) => {
debugger;
console.log('updated question is ', data);

$('#btnQUCancelConfirm').trigger('click');

 this.displayQuestionOnTopicBasis(topicOfQues,0);
}).catch((err) => {
console.log(err);
});
}
//


}

export default DisplayQuestionTopicBasedService;
