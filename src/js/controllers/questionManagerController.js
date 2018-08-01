
const qManService = require('./../services/questionManagerService');

module.exports = $(document).ready(() => {
    $('#btnGenerate').on('click', function(){
      // console.log('test')
      let topic = $('#topicInput').val();
      let template = $('#templateInput').val();
      let formQuery = '';
      formQuery = formQuery + '?topic=' + topic;
      formQuery = formQuery + '&template=' + template;
      initiateWizard(formQuery);
    });

    $('#admin-tab').click();

    function initiateWizard(qGenQuery) {
      let url = '/api/parseTemplate' + qGenQuery;
      fetch(url)
      .then(function(res) {
          // console.log(res)
          res.json().then((body) => {
              // TODO Temp call below
            body = JSON.parse(body);
            qManService.getNodeDataFor(body.topics[0].normal)
          })
      })
  }
})