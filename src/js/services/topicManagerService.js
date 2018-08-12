class TopicManagerService {
  constructor() {

  }

  getTopics() {
    const promise = jQuery.ajax({
      type: 'get',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topics',
      data: JSON.stringify({}),
    }).done(response => response).fail(jqXhr => jqXhr);

    return promise;
  }

  saveTopic(topic) {
    const promise = jQuery.ajax({
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topics',
      data: JSON.stringify(topic),
    }).done(response => response).fail(jqXhr => jqXhr);

    return promise;
  }

  saveTopicCount(count) {
    const promise = jQuery.ajax({
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topicCount',
      data: JSON.stringify({'count':4}),
    }).done(response => response).fail(jqXhr => jqXhr);

    return promise;
  }

  deleteTopic(topic) {
    const promise = jQuery.ajax({
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topics/delete',
      data: JSON.stringify(topic),
    }).done(response => response).fail(jqXhr => jqXhr);

    return promise;
  }
}


export default TopicManagerService;
