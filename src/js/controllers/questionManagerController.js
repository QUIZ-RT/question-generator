
const jQuery = require('jquery');
const qManService = require('./../services/questionManagerService');

module.exports = jQuery(document).ready(() => {
  function initiateWizard(qGenQuery) {
    const url = `/api/parseTemplate${qGenQuery}`;
    fetch(url)
      .then((res) => {
        console.log(res);
        res.json().then((body) => {
          // TODO Temp call below
          const bodyValue = JSON.parse(body);
          qManService.getNodeDataFor(bodyValue.topics[0].normal);
        });
      });
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

  jQuery('#admin-tab').click();
});
