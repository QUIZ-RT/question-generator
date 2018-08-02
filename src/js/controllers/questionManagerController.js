
const jQuery = require('jquery');
const qManService = require('./../services/questionManagerService');

module.exports = jQuery(document).ready(() => {
  // function initiateWizard(qGenQuery) {
  //   const url = `/api/parseTemplate${qGenQuery}`;
  //   fetch(url)
  //     .then((res) => {
  //       console.log(res);
  //       res.json().then((body) => {
  //         // TODO Temp call below
  //         const bodyValue = JSON.parse(body);
  //         qManService.getNodeDataFor(bodyValue.topics[0].normal);
  //       });
  //     });
  // }

    $('#admin-tab').click();

    function initiateWizard(qGenQuery) {
      let url = '/api/parseTemplate' + qGenQuery;
      fetch(url)
      .then(function(res) {
          // console.log(res)
          res.json().then((body) => {
              // TODO Temp call below
            body = JSON.parse(body);
            qManService.getNodeDataFor(body)
          })
      })
  }

  jQuery('#btnGenerate').on('click', () => {
    // console.log('test')
    const topic = jQuery('#topicInput').val();
    const template = jQuery('#templateInput').val();
    let formQuery = '';
    formQuery = `${formQuery}?topic=${topic}`;
    formQuery = `${formQuery}&template=${template}`;
    initiateWizard(formQuery);
  });
});
