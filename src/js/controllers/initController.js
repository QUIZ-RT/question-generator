import QuestionController from './questionController';
import { QuestionManagerController } from './questionManagerController';
import { DomService } from './../services/domService';
const $dom = new DomService();

module.exports = jQuery(document).ready(() => {
    $dom.load(false);
    $('#btnGenerate').on('click', () => {
        console.log('test')
        const topic = $('#topicInput').val();
        const template = $('#templateInput').val();
        let formQuery = '';
        formQuery = `${formQuery}?topic=${topic}`;
        formQuery = `${formQuery}&template=${template}`;
        QuestionManagerController.prototype.initiateWizard(formQuery);
    });

    $('#btnProceedWizardStep2').on('click', function() {
        let containerWizard = $(this).closest('#wizardStep2Content');
        let clickedElement = containerWizard.find('.clickPill');
        QuestionManagerController.prototype.callSubjectIdentifier($(`#${clickedElement.prop('id')} span`).html());
    })

    $('#btnProceedWizardStep3').on('click', function() {
        let containerWizard = $(this).closest('#wizardStep3Content');
        let selectedElements = containerWizard.find('.clickPill');
        let selectedElementsIdArray = [];
        let topicCategory = document.getElementById('topicInput').value;
        for(const selectedElement of selectedElements) {
            selectedElementsIdArray.push(selectedElement.id);
        }
        QuestionManagerController.prototype.generateQuestions(selectedElementsIdArray, topicCategory);
    })
    // $('#wizardStep2Content').addClass('small');
    // $('#wizardStep3Content').addClass('smaller');

    $('#subject-pills-2').on('click', '.subject-pills', function() {
        if(!$('#wizardStep2').prop("disabled") || $('#wizardStep2').prop("disabled") == false) {
            let self = $(this);
            $('#subject-pills-2').children('.subject-pills').each(function() {
                if(self != $(this) && $(this).hasClass('clickPill')) {
                    $(this).removeClass('clickPill');
                }
            })
            self.addClass('clickPill');
        }
    });

    $('#subject-pills-3').on('click', '.subject-pills', function() {
        if(!$('#wizardStep3').prop("disabled") || $('#wizardStep3').prop("disabled") == false) {
            if($(this).hasClass('clickPill')) {
                $(this).removeClass('clickPill');
            } else {
                $(this).addClass('clickPill');
            }
        }
    })
})