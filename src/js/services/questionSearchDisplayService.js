class DisplayQuestionTopicBasedService {
    constructor() {
    }

  getTopicz() {
      const authKey = localStorage.getItem('accessToken');
      console.log("getAllTopics in service");
      debugger;
    const promise = jQuery.ajax({
      type: 'get',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topics',
      data: JSON.stringify({}),
    }).done(response => response).fail(jqXhr => jqXhr);

    return promise;
  }

  getQuestionsOnTopicBasis(topicSelected) {
  const authKey = localStorage.getItem('accessToken');
  var myUrl = "/firebase/api/questions/" + topicSelected;
console.log("myUrl : " + myUrl);

  const promise = jQuery.ajax({
    type: 'get',
    contentType: 'application/json',
    dataType: 'json',
    url: myUrl,
    data: JSON.stringify({}),
  }).done(response => response).fail(jqXhr => jqXhr);
  return promise;

}

}

export default DisplayQuestionTopicBasedService;
