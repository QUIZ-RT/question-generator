
const qManService = require('./../services/questionManagerService');

module.exports = $(document).ready(() => {
  $('#btnGenerate').on('click', () => {
    // console.log('test')
    const topic = $('#topicInput').val();
    const template = $('#templateInput').val();
    let formQuery = '';
    formQuery = `${formQuery}?topic=${topic}`;
    formQuery = `${formQuery}&template=${template}`;
    initiateWizard(formQuery);
  });

  $('#admin-tab').click();

  function initiateWizard(qGenQuery) {
    const url = `/api/parseTemplate${qGenQuery}`;
    fetch(url)
      .then((res) => {
        // console.log(res)
        res.json().then((body) => {
          // TODO Temp call below
          body = JSON.parse(body);
          qManService.getNodeDataFor(body);
        });
      });
  }
});
