import QuestionController from './questionController';
import {
  QuestionManagerController
} from './questionManagerController';
import {
  DomService
} from '../services/domService';

const $dom = new DomService();

module.exports = jQuery(document).ready(() => {
  $dom.load(false);
  $(document).on('click', '#btnGenerate', () => {
    // console.log('test')
    const topic = $('#topicInput').val();
    const template = $('#templateInput').val();
    let formQuery = '';
    formQuery = `${formQuery}?topic=${topic}`;
    formQuery = `${formQuery}&template=${template}`;
    QuestionManagerController.prototype.initiateWizard(formQuery);
  });

  $(document).on('click', '#btnProceedWizardStep2', function () {
    const containerWizard = $(this).closest('#wizardStep2Content');
    const clickedElement = containerWizard.find('.clickPill');
    QuestionManagerController.prototype.callSubjectIdentifier($(`#${clickedElement.prop('id')} span`).html());
  });

  $(document).on('click', '#btnProceedWizardStep3', function () {
    const containerWizard = $(this).closest('#wizardStep3Content');
    const selectedElements = containerWizard.find('.clickPill');
    const selectedElementsIdArray = [];
    const topicCategory = document.getElementById('topicInput').value;
    for (const selectedElement of selectedElements) {
      selectedElementsIdArray.push(selectedElement.id);
    }
    QuestionManagerController.prototype.generateQuestions(selectedElementsIdArray, topicCategory);
  });

  // $(document).click(function(event) {
  //     if (event.target !== obj[0]) {
  //         obj2.hide();
  //     }
  // });

  $(document).on('click', '#btnSubmitQuestions', function () {
  // $('#btnSubmitQuestions').on('click', function() {
    $('#btnCancelConfirm').trigger('click');
    QuestionManagerController.prototype.delegateSaveOperation();

  })
  $(document).on('keyup', '#templateInput', (e) => {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
      let topic = document.getElementById('topicInput').value;
      let template = document.getElementById('templateInput').value;
      if(!(topic && topic !== '' && template && template !== '')) {
        DomService.prototype.showTemplateError('Topic and Question Template are both required values, please try again!')
      }
      $('#btnGenerate').click();
    }
  });
  $(document).on('click', '#wizardContainer', function (event) {
    var current = event.target;
    while(current) {
      if(!(current.id && current.id.startsWith('wizardStep'))){
        current = current.parentElement;
        continue;
      }
      if(current.id.endsWith('Content')) {
        let step = current.id.substr('wizardStep'.length).substr(0, 1);
        DomService.prototype.updateWizardClasses(step);
        break;
      }
    }
  });

  $(document).on('click', '#subject-pills-2 > .subject-pills', function () {
    // $('#subject-pills-2').on('click', '.subject-pills', function() {
    if (!$('#wizardStep2').prop('disabled') || $('#wizardStep2').prop('disabled') == false) {
      const self = $(this);
      $('#subject-pills-2').children('.subject-pills').each(function () {
        if (self != $(this) && $(this).hasClass('clickPill')) {
          $(this).removeClass('clickPill');
        }
      });
      self.addClass('clickPill');
    }
  });

  $(document).on('click', '#subject-pills-3 > .subject-pills', function () {
    // $('#subject-pills-3').on('click', '.subject-pills', function() {
    if (!$('#wizardStep3').prop('disabled') || $('#wizardStep3').prop('disabled') == false) {
      if ($(this).hasClass('clickPill')) {
        $(this).removeClass('clickPill');
      } else {
        $(this).addClass('clickPill');
      }
    }
  });
});
