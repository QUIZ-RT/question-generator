// import { sidenav } from './../views/sidenav';
import { footer } from '../views/footer';
import { loginForm } from '../views/loginForm';
import { wizardStep1 } from '../views/wizardStep1';
import { wizardStep2 } from '../views/wizardStep2';
import { wizardStep3 } from '../views/wizardStep3';
// import { menu } from './../views/menu';
import { messages } from '../views/messages';
import { line } from '../views/partition';
import { wizardContainer } from '../views/wizardContainer';
import { Helper } from '../utils/helper';

const helper = new Helper();

export class DomService {
  constructor() {
    this.views = {
      // sidenav,
      footer,
      loginForm,
      wizardStep1,
      wizardStep2,
      wizardStep3,
      wizardContainer,
      // menu,
      messages,
      line,
    };
    this.wizardClasses = [{ small: 1 }, { smaller: 2 }, { smallest: 3 }];
  }


  load(navCall) {
    if (navCall) {
      this.createWizards();
    }
    $('#footer').html(this.views.footer);
    $('#footer').removeClass('hide');
  }

  showWizardContainer() {
    this.load(true);
    const wizardContainer = document.getElementById('wizardContainer');
    if (wizardContainer.classList.contains('hide')) {
      wizardContainer.classList.remove('hide');
    }
  }

  showWizardStep(body, step, msg) {
    const id = `wizardStep${step}`;
    const element = $(`#${id}`);
    if (!this.isVisible(element)) {
      element.append(this.getDomObjectFromTemplate(id));
      $(line).insertAfter(element);
      element.removeClass('hide');
    }
    this.populateWizard(body, step, msg);
    // this.updateWizardClasses(step, currentElementClass);
    // element.attr('class', 'row');
  }

  populateWizard(body, step, msg) {
    const pillContainer = document.getElementById(`subject-pills-${step}`);
    const wizardMsg = document.getElementById(`wizard${step}Msg`);
    wizardMsg.classList.remove('hide');
    switch (step) {
      case '2':
        pillContainer.innerHTML = '';
        if (Array.isArray(body)) {
          for (const subject of body) {
            const pill = this.createSubjectPill(subject);
            pillContainer.appendChild(pill);
          }
        } else {
          const pill = this.createSubjectPill(body);
          pill.classList.add('clickPill');
          pillContainer.appendChild(pill);
        }
        wizardMsg.innerHTML = msg;
        break;
      case '3':
        pillContainer.innerHTML = '';
        if (Array.isArray(body)) {
          for (const subject of body) {
            const property = subject;
            const pill = this.createSubjectPill(property.val.value);
            pill.setAttribute('id', `${property.valUrl.value.substring(property.valUrl.value.lastIndexOf('/') + 1)}`);
            pillContainer.appendChild(pill);
          }
        } else {
          const pill = this.createSubjectPill(body);
          pill.classList.add('clickPill');
          pillContainer.appendChild(pill);
        }
        wizardMsg.innerHTML = msg;
        break;
    }
  }

  createSubjectPill(subject) {
    const pill = document.createElement('div');
    const pillContent = document.createElement('span');
    pill.classList.add('subject-pills');
    pillContent.classList.add('subject-pills-content');
    pill.setAttribute('id', `pill-${helper.replaceAll(subject, ' ', '-')}`);
    pillContent.innerHTML = subject;
    pill.appendChild(pillContent);
    return pill;
  }

  createWizards() {
    $('#mainContent').html('');
    $('#mainContent').append(this.views.wizardContainer);
    $('#messages').append(this.getDomObjectFromTemplate('messages'));
    $('#wizardStep1').append(this.getDomObjectFromTemplate('wizardStep1'));
    $(line).insertAfter($('#wizardStep1'));
    $('#wizardStep2').append(this.getDomObjectFromTemplate('wizardStep2'));
    $(line).insertAfter($('#wizardStep2'));
    $('#wizardStep3').append(this.getDomObjectFromTemplate('wizardStep3'));
    $(line).insertAfter($('#wizardStep3'));

    $('#wizardStep1').removeClass('hide');
    // // this.disableForm('wizardStep2');
    // // this.disableForm('wizardStep3');
    $('#wizardStep2').removeClass('hide');
    $('#wizardStep3').removeClass('hide');
    $('.line').removeClass('hide');
  }

  executeAuthorizedLoads() {

  }

  showTemplateError(msg) {
    $('#msgFailure').html(msg);
    $('#failureAlert').removeClass('hide');
  }

  appendHtml(el, str) {
    const div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  }

  getDomObjectFromTemplate(view) {
    const template = document.createElement('template');
    template.innerHTML = this.views[view];
    const domObj = template.content.children;
    return domObj;
  }

  updateWizardClasses(step) {
    const id = `#wizardStep${step}`;
    const element = $(id);
    let currentElementClass = '';
    const classlist = element.attr('class').split(/\s+/);
    for (let i = 0; i < this.wizardClasses.length; i++) {
      if (classlist.contains(this.wizardClasses[i])) {
        currentElementClass = this.wizardClasses[i];
      }
    }
    this.enableForm(id);
  }

  setHiddenValue(value, fieldId) {
    const hiddenFieldElement = document.getElementById(fieldId);
    hiddenFieldElement.value = value;
  }

  getHiddenValue(fieldId) {
    return document.getElementById(fieldId).value;
  }

  disableForm(id) {
    $(`#${id} *`).prop('disabled', true);
  }

  enableForm(id) {
    $(`#${id} *`).prop('disabled', false);
  }

  isVisible(element) {
    return element ? !element.hasClass('hide') : false;
  }
}
