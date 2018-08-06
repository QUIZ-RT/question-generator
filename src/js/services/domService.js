import { nav } from './../views/nav';
import { footer } from './../views/footer';
import { loginForm } from './../views/loginForm';
import { wizardStep1 } from './../views/wizardStep1';
import { wizardStep2 } from './../views/wizardStep2';
import { wizardStep3 } from './../views/wizardStep3';
import { menu } from './../views/menu';
import { messages } from './../views/messages';
import { line } from './../views/partition';
import { Helper } from '../utils/helper';
const helper = new Helper();

export class DomService {

    constructor() {
        this.views =  {
            nav,
            footer,
            loginForm,
            wizardStep1,
            wizardStep2,
            wizardStep3,
            menu,
            messages,
            line
        };
        this.wizardClasses = [{'small':1}, {'smaller':2}, {'smallest':3}];
    }


    load() {
        // let wizardStep1Doc = document.createElement('div');
        // let lineDoc = document.createElement('div');
        // let wizardStep2Doc = document.createElement('div');
        // wizardStep1Doc.innerHTML = this.views.wizardStep1;
        // lineDoc.innerHTML = this.views.line;
        // wizardStep2Doc.innerHTML = this.views.wizardStep2;
        $('#nav').append(this.getDomObjectFromTemplate('nav'));
        $('#menu').append(this.getDomObjectFromTemplate('menu'));
        $('#messages').append(this.getDomObjectFromTemplate('messages'));
        $('#wizardStep1').append(this.getDomObjectFromTemplate('wizardStep1'));
        $(line).insertAfter($('#wizardStep1'));
        $('#wizardStep2').append(this.getDomObjectFromTemplate('wizardStep2'));
        $(line).insertAfter($('#wizardStep2'));
        $('#wizardStep3').append(this.getDomObjectFromTemplate('wizardStep3'));
        $(line).insertAfter($('#wizardStep3'));
        $('#footer').html(this.views.footer);

        $('#nav').removeClass('hide');
        $('#menu').removeClass('hide');
        $('#wizardStep1').removeClass('hide');
        // this.disableForm('wizardStep2');
        // this.disableForm('wizardStep3');
        $('#wizardStep2').removeClass('hide');
        $('#wizardStep3').removeClass('hide');
        $('.line').removeClass('hide');
        $('#footer').removeClass('hide');

        this.executeAuthorizedLoads();

        // DEV TEST ONLY - to be removed!!
        $('#admin-tab').click();
        $('#topicInput').val('Politics');
        $('#templateInput').val('what is the date of birth of sachin tendulkar?');
    }

    showWizardStep(body, step, msg) {
        let id = `wizardStep${step}`
        let element = $(`#${id}`);
        if(!this.isVisible(element)) {
            element.append(this.getDomObjectFromTemplate(id));
            $(line).insertAfter(element);
            element.removeClass('hide');
        }
        this.populateWizard(body, step, msg);
        //this.updateWizardClasses(step, currentElementClass);
        //element.attr('class', 'row');

    }

    populateWizard(body, step, msg) {
        let pillContainer = document.getElementById(`subject-pills-${step}`);
        let wizardMsg = document.getElementById(`wizard${step}Msg`);
        wizardMsg.classList.remove('hide');
        switch(step) {
            case "2":
                pillContainer.innerHTML = '';
                if(Array.isArray(body)) {
                    for(const subject of body) {
                        let pill = this.createSubjectPill(subject);
                        pillContainer.appendChild(pill);
                    }
                } else {
                    let pill = this.createSubjectPill(body);
                    pill.classList.add('clickPill');
                    pillContainer.appendChild(pill);
                }
                wizardMsg.innerHTML = msg;
                break;
            case "3":
                pillContainer.innerHTML = '';
                if(Array.isArray(body)) {
                    for(const subject of body) {
                        let property = subject;
                        let pill = this.createSubjectPill(property.val.value);
                        pill.setAttribute('id', `${property.valUrl.value.substring(property.valUrl.value.lastIndexOf('/') + 1)}`);
                        pillContainer.appendChild(pill);
                    }
                } else {
                    let pill = this.createSubjectPill(body);
                    pill.classList.add('clickPill');
                    pillContainer.appendChild(pill);
                }
                wizardMsg.innerHTML = msg;
                break;
        }
    }

    createSubjectPill(subject) {
        let pill = document.createElement('div');
        let pillContent = document.createElement('span');
        pill.classList.add('subject-pills');
        pillContent.classList.add('subject-pills-content');
        pill.setAttribute('id', `pill-${helper.replaceAll(subject, " ", "-")}`);
        pillContent.innerHTML = subject;
        pill.appendChild(pillContent);
        return pill;
    }

    executeAuthorizedLoads() {

    }

    showTemplateError(msg) {
        $('#msgFailure').html(msg)
        $('#failureAlert').removeClass('hide');
    }

    appendHtml(el, str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    }

    getDomObjectFromTemplate(view) {
        const template = document.createElement("template");
        template.innerHTML = this.views[view];
        let domObj = template.content.children;
        return domObj;
    }

    updateWizardClasses(step) {
        let id = `#wizardStep${step}`
        let element = $(id);
        let currentElementClass = '';
        let classlist = element.attr('class').split(/\s+/);
        for(let i = 0; i < this.wizardClasses.length; i++) {
            if(classlist.contains(this.wizardClasses[i]) ) {
                currentElementClass = this.wizardClasses[i];
            }
        }
        this.enableForm(id);
    }

    setHiddenValue(value, fieldId) {
        let hiddenFieldElement = document.getElementById(fieldId);
        hiddenFieldElement.value = value;
    }

    getHiddenValue(fieldId) {
        return document.getElementById(fieldId).value;
    }

    disableForm(id) {
        $(`#${id} *`).prop("disabled", true);
    }

    enableForm(id) {
        $(`#${id} *`).prop("disabled", false);
    }
    
    isVisible(element) {
        return element ? !element.hasClass("hide") : false;
    }
}
