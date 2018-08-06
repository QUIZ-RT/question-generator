
const qManService = require('./../services/questionManagerService');
import { DomService } from './../services/domService';
const domService = new DomService();

export class QuestionManagerController {

  initiateWizard(qGenQuery) {
    let url = '/api/questionManager/parseTemplate' + qGenQuery;
    fetch(url)
    .then(function(res) {
        if(res.status && res.status == 200) {
          res.json().then((body) => {
            qManService.processResponseFromTemplateParser(body);
          })
        } else {

        }
    })
  }

  delegateWizardViewRequest() {
    domService.showWizardContainer();
  }

  callSubjectIdentifier(subject) {
    qManService.determineNodeAndCategory(subject);
  }

  generateQuestions(itemsArray, topicCategory) {
    qManService.generateQuestions(itemsArray, topicCategory);
  }
}
