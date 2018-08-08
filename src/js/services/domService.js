// import { sidenav } from './../views/sidenav';
import {
    footer
} from '../views/footer';
import {
    loginForm
} from '../views/loginForm';
import {
    wizardStep1
} from '../views/wizardStep1';
import {
    wizardStep2
} from '../views/wizardStep2';
import {
    wizardStep3
} from '../views/wizardStep3';
// import { menu } from './../views/menu';
import {
    messages
} from '../views/messages';
import {
    line
} from '../views/partition';
import {
    wizardContainer
} from '../views/wizardContainer';
import {
    QGModal
} from '../views/QGModal';
import {
    Helper
} from '../utils/helper';

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
            QGModal,
            wizardContainer,
            // menu,
            messages,
            line
        };
        this.wizardClasses = [{
            'small': 1
        }, {
            'smaller': 2
        }, {
            'smallest': 3
        }];
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
        let wizardContainer = document.getElementById('wizardContainer');
        if (wizardContainer.classList.contains('hide')) {
            wizardContainer.classList.remove('hide');
        }
    }

    showWizardStep(body, step, msg) {
        let id = `wizardStep${step}`
        let element = $(`#${id}`);
        if (!this.isVisible(element)) {
            element.append(this.getDomObjectFromTemplate(id));
            $(line).insertAfter(element);
            element.removeClass('hide');
        }
        this.populateWizard(body, step, msg);
        this.updateWizardClasses(step);
        //element.attr('class', 'row');

    }

    populateWizard(body, step, msg) {
        let pillContainer = document.getElementById(`subject-pills-${step}`);
        let wizardMsg = document.getElementById(`wizard${step}Msg`);
        wizardMsg.classList.remove('hide');
        switch (step) {
            case "2":
                pillContainer.innerHTML = '';
                if (Array.isArray(body)) {
                    for (const subject of body) {
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
                if (Array.isArray(body)) {
                    for (const subject of body) {
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

    createWizards() {
        $('#mainContainer').html('');
        $('#mainContainer').append(this.views.wizardContainer);
        $('#messages').append(this.getDomObjectFromTemplate('messages'));
        $('#wizardStep1').append(this.getDomObjectFromTemplate('wizardStep1'));
        $(line).insertAfter($('#wizardStep1'));
        $('#wizardStep2').append(this.getDomObjectFromTemplate('wizardStep2'));
        $(line).insertAfter($('#wizardStep2'));
        $('#wizardStep3').append(this.getDomObjectFromTemplate('wizardStep3'));
        $(line).insertAfter($('#wizardStep3'));

        $('#wizardStep1').removeClass('hide');
        // this.disableForm('wizardStep2');
        // this.disableForm('wizardStep3');
        $('#wizardStep2').removeClass('hide');
        $('#wizardStep3').removeClass('hide');
        $('.line').removeClass('hide');
        $('#wizardStep2Content').addClass('size-shrink_2');
        $('#wizardStep3Content').addClass('size-shrink_1');

        // Modal
        $(QGModal).insertAfter('#messages');
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

    showGeneratedQuestionDisplayer(propertyQuestionMap) {
        let outputModal = $('#btnGeneratedQuestionsDisplay')
        let tableHolder = $('#tableHolder');
        outputModal.click();
        let qGenTable = this.getQuestionTable(propertyQuestionMap);
        tableHolder.html('');
        tableHolder.append(qGenTable);
    }

    getQuestionTable(propertyQuestionMap) {
        // Create Elements
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tr_head = document.createElement("tr");
        const th_1 = document.createElement("th");
        const th_2 = document.createElement("th");
        const th_3 = document.createElement("th");
        const th_4 = document.createElement("th");
        const th_5 = document.createElement("th");

        // Add Attributes
        table.classList.add("table", "tabled-bordered", "table-striped", "table-hover");
        thead.classList.add("thead-dark");
        th_1.setAttribute("scope", "col");
        th_2.setAttribute("scope", "col");
        th_3.setAttribute("scope", "col");
        th_4.setAttribute("scope", "col");
        th_5.setAttribute("scope", "col");

        // Add Content
        th_1.innerHTML = "#";
        th_2.innerHTML = "Property";
        th_3.innerHTML = "Generated Question";
        th_4.innerHTML = "Options";
        th_5.innerHTML = "Answer";

        // Associations
        tr_head.appendChild(th_1);
        tr_head.appendChild(th_2);
        tr_head.appendChild(th_3);
        tr_head.appendChild(th_4);
        tr_head.appendChild(th_5);
        thead.appendChild(tr_head);
        table.appendChild(thead);

        // Table Data dynamic
        const tbody = document.createElement("tbody");

        Object.keys(propertyQuestionMap).forEach(function(key) {
            let quesArray = propertyQuestionMap[key];
            for(let i = 0; i < 3 && i < quesArray.length; i++) {
                const currentQuestion = quesArray[i];
                // Create Elements
                const tr_body = document.createElement("tr");
                const th_vertical = document.createElement("th");
                const td_1 = document.createElement("td");
                const td_2 = document.createElement("td");
                const td_3 = document.createElement("td");
                const td_4 = document.createElement("td");

                 // Add Attributes
                th_vertical.setAttribute("scope", "row");
                tr_body.setAttribute("id", `qGen-${i}`);

                // Add Inner HTML
                th_vertical.innerHTML = i + 1;
                td_1.innerHTML = key;
                td_2.innerHTML = currentQuestion.question;
                td_3.innerHTML = currentQuestion.options.join();
                td_4.innerHTML = currentQuestion.answer;

                // Associations
                tr_body.appendChild(th_vertical);
                tr_body.appendChild(td_1);
                tr_body.appendChild(td_2);
                tr_body.appendChild(td_3);
                tr_body.appendChild(td_4);
                tbody.appendChild(tr_body);
            }
            const tr_break= document.createElement("tr");
            const td_break = document.createElement("td");
            td_break.setAttribute('colspan', 5);
            tr_break.appendChild(td_break);
            tbody.appendChild(tr_break);
            tbody.appendChild(tr_break);
            tbody.appendChild(tr_break);
        })

        table.appendChild(tbody);

        return table;
    }

    updateWizardClasses(step) {
        step = parseInt(step);
        let decrementalIterator = step - 1;
        let incrementalIterator = step + 1;
        let classStartsWith = 2;
        let availableClassCounter = 0;
        let wizardSteps = $('#wizardContainer').children();
        let id = `wizardStep${step}Content`
        let element = $(`#${id}`);
        element.attr('class', 'row wizardStep normal');
        while (decrementalIterator > 0) {
            let id = `wizardStep${decrementalIterator}Content`
            let element = $(`#${id}`);
            if(element) {
                element.attr('class', `row wizardStep size-shrink_${classStartsWith}`);
            }
            classStartsWith = classStartsWith - 1;
            decrementalIterator = decrementalIterator - 1;
            availableClassCounter = availableClassCounter + 1;
        }
        classStartsWith = 2;
        while (incrementalIterator <= (wizardSteps.length / 2)) { // divide by two to account for line divs added after each wizard step
            let id = `wizardStep${incrementalIterator}Content`
            let element = $(`#${id}`);
            if(element) {
                element.attr('class', `row wizardStep size-grow_${classStartsWith}`);
            }
            classStartsWith = classStartsWith - 1;
            incrementalIterator = incrementalIterator + 1;
            availableClassCounter = availableClassCounter + 1;
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
