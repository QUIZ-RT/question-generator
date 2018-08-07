import QuestionController from './questionController';
import { QuestionManagerController } from './questionManagerController';
import { DomService } from './../services/domService';
const $dom = new DomService();

module.exports = jQuery(document).ready(() => {
    $dom.load(false);
    $(document).on("click", "#btnGenerate", () => {
        // console.log('test')
        const topic = $('#topicInput').val();
        const template = $('#templateInput').val();
        let formQuery = '';
        formQuery = `${formQuery}?topic=${topic}`;
        formQuery = `${formQuery}&template=${template}`;
        QuestionManagerController.prototype.initiateWizard(formQuery);
    });

    $(document).on("click", "#btnProceedWizardStep2", () => {
        let containerWizard = $(this).closest('#wizardStep2Content');
        let clickedElement = containerWizard.find('.clickPill');
        QuestionManagerController.prototype.callSubjectIdentifier($(`#${clickedElement.prop('id')} span`).html());
    })

    $(document).on("click", "#btnProceedWizardStep3", () => {
        let containerWizard = $(this).closest('#wizardStep3Content');
        let selectedElements = containerWizard.find('.clickPill');
        let selectedElementsIdArray = [];
        let topicCategory = document.getElementById('topicInput').value;
        for(const selectedElement of selectedElements) {
            selectedElementsIdArray.push(selectedElement.id);
        }
        QuestionManagerController.prototype.generateQuestions(selectedElementsIdArray, topicCategory);
    })

    // $(document).click(function(event) {
    //     if (event.target !== obj[0]) {
    //         obj2.hide();
    //     }
    // });
    // $('#wizardStep2Content').addClass('small');
    // $('#wizardStep3Content').addClass('smaller');

    $(document).on("click", "#subject-pills-2 > .subject-pills", function() {
    // $('#subject-pills-2').on('click', '.subject-pills', function() {
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

    $(document).on("click", "#subject-pills-3 > .subject-pills", function() {
    // $('#subject-pills-3').on('click', '.subject-pills', function() {
        if(!$('#wizardStep3').prop("disabled") || $('#wizardStep3').prop("disabled") == false) {
            if($(this).hasClass('clickPill')) {
                $(this).removeClass('clickPill');
            } else {
                $(this).addClass('clickPill');
            }
        }
    })
})