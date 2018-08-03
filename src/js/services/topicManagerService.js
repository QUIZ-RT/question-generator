class TopicManagerService {
  constructor() {

  }

  getTopics(res, fail) {
    const promise = jQuery.ajax({
      type: 'get',
      contentType: 'application/json',
      dataType: 'json',
      url: '/firebase/api/topics',
      data: JSON.stringify(topic),
    }).done(response => response).fail(jqXhr => jqXhr);

    return promise;
  }
}

export default TopicManagerService;
