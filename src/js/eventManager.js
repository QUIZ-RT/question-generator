import questionManager from './controllers/questionManagerController';

module.exports = $(document).ready(() => {
  $('#btnGenerate').on('click', () => {
    // console.log('test')
    const topic = $('#topicInput').val();
    const template = $('#templateInput').val();
    const formInput = {};
    formInput.topic = topic;
    formInput.template = template;
    questionManager.initiateWizard(formInput);
  });
});
