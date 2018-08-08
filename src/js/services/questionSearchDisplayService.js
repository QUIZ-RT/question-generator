class DisplayQuestionTopicBasedService {
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

  getQuestionsOnTopicBasis(topicSelected) {
    const authKey = localStorage.getItem('accessToken');
    const myUrl = `/firebase/api/questions/${topicSelected}`;
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
}

export default DisplayQuestionTopicBasedService;
