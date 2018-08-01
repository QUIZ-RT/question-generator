import questionManager from './controllers/questionManagerController';

module.exports = $(document).ready(() => {
    $('#btnGenerate').on('click', function(){
      // console.log('test')
      let topic = $('#topicInput').val();
      let template = $('#templateInput').val();
      let formInput = {};
      formInput.topic = topic;
      formInput.template = template;
      questionManager.initiateWizard(formInput);
    })
})