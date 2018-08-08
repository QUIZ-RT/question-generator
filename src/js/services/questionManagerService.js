import { SparqlConstants } from '../shared/sparqlConstants';
import { Helper } from '../utils/helper';
import { DomService } from './domService';

const helper = new Helper();
const queries = require('./../queries/sparqueries');
// require('./../../../routes/questionManagerRoutes');
const dom = new DomService();

module.exports = {
  endpointUrl: SparqlConstants.END_POINT_URL,
  countryToCityMap: {},
  default_number_of_options: 3,

  getNodeDataFor(compromiseResponse) {
    const generatedTopic = compromiseResponse.nouns[0].normal;
    const topicCategory = compromiseResponse.givenTopic;
    this.constructCountryToCityMap(this.generateQuestions, topicCategory);
  },

  constructCountryToCityMap(callback, topicCategory) {
    const self = this;
    // let countryToCityMap = {};
    let cityQuery = queries.distinct_countries,
      fullUrl = `${this.endpointUrl}?query=${encodeURIComponent(cityQuery)}`,
      headers = { Accept: 'application/sparql-results+json' };
    fetch(fullUrl, {
      headers,
    }).then(body => body.json()).then((json) => {
      const { head: { vars }, results } = json;
      let cityArray = [];
      for (const result of results.bindings) {
        const countryId = result.country.value;
        const city = result.placeofbirthLabel.value;
        if (self.countryToCityMap[countryId]) {
          cityArray = self.countryToCityMap[countryId];
        } else {
          cityArray = [];
          self.countryToCityMap[countryId] = cityArray;
        }
        if (!cityArray.includes(city)) cityArray.push(city);
        // console.log(result['country']['value'])
        // console.log(result['placeofbirthLabel']['value']);
      }
      callback(self, topicCategory);
      // console.log(countryToCityMap);
    });
  },

  generateQuestions(itemsArray, topicCategory) {
    let sparqlQuery = queries.query;
    const instanceType = dom.getHiddenValue('wizard3-instanceKeyHolder');
    let selectedProperties = [];
    let propUrls = [];
    self = this;
    switch (instanceType) {
      case SparqlConstants.VALUES.INSTANCE_OF.HUMAN:
        selectedProperties = SparqlConstants.PROPS.PEOPLE;
        Object.keys(selectedProperties).forEach((key) => {
            const selectedProperty = selectedProperties[key];
            // let selectedProperty = selectedProperties[key];
            if(selectedProperty.PID === 'P106') {
                return true;
            }
            const sparqConcat = helper.convertToSparqConcat(selectedProperty.QUESTION_TEMPLATE);
            sparqlQuery = `${sparqlQuery.replace('#PRIMARY_FILTER', SparqlConstants.PROPS.PEOPLE.OCCUPATION.PID)}`;
            sparqlQuery = `${sparqlQuery.replace('#PRIMARY_FILTER_VALUE', itemsArray[0])}`;
            sparqlQuery = `${sparqlQuery.replace('#PROPERTY', selectedProperty.PID)}`;
            sparqlQuery = `${sparqlQuery.replace('#TEMPLATE', sparqConcat)}`;
            // console.log(sparqlQuery);
            propUrls.push({'key': key, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(sparqlQuery)}`});
            sparqlQuery = queries.query;
        })
        self.generateQuestionsRecursive(propUrls, 0, topicCategory, [], {});
        break;
      default:
        break;
    }
  },

  generateQuestionsRecursive(propsArray, propsIndex, topicCategory, quesArray, propertyQuestionMap) {
    let self = this;
    if(propsIndex > propsArray.length - 1) {
      window.localStorage.setItem('question_data', JSON.stringify(quesArray));
      self.getConfirmationOnGenerated(propertyQuestionMap);
      return;
    }
    let propertyQuestionUrl = propsArray[propsIndex]['URL'];
    let property = propsArray[propsIndex]['key'];
    let headers = {
        Accept: 'application/sparql-results+json',
    };
    fetch(propertyQuestionUrl, {
        headers,
      }).then(body => body.json()).then((json) => {
        let quesArrayPerProperty = [];
        const {
          head: {
            vars,
          },
          results,
        } = json;
        const batchId = helper.generateId();
        for (const result of results.bindings) {
          const questionObj = {};
          questionObj.batchId = batchId;
          questionObj.question = result.questionlabel.value;
          // console.log(questionObj.question);
          questionObj.answer = result.propertyLabel.value;
          questionObj.topic = topicCategory;
          const options = helper.generateOptions(result, results.bindings);
          options.push(questionObj.answer);
          questionObj.options = options;
          quesArrayPerProperty.push(questionObj);
        }
        propertyQuestionMap[property] = quesArrayPerProperty;
        quesArray = quesArray.concat(quesArrayPerProperty);
        self.generateQuestionsRecursive(propsArray, ++propsIndex, topicCategory, quesArray, propertyQuestionMap);
      });
  },

  getConfirmationOnGenerated(propertyQuestionMap) {
    dom.showGeneratedQuestionDisplayer(propertyQuestionMap);
  },

  saveQuestions(quesArray) {
    // console.log(`after : ${quesArray}`);
    $.ajax({
      url: '/firebase/api/questions',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(quesArray),
      success(data) {
        console.log(data);
      },
      error(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  },

  determineNodeAndCategory(subject) {
    const entityURL = SparqlConstants.WIKI_ENTITY_SEARCH_URL.replace('#entity', subject);
    const headers = { Accept: 'application/sparql-results+json' };
    const entityURLWrapper = `/api/questionManager/determineNodeAndCategory?entityURL=${encodeURIComponent(entityURL)}`;
    fetch(entityURLWrapper, headers).then(res => res.json()).then(body => this.processEntityURLResponse(body));
  },

  processEntityURLResponse(body) {
    if (body) {
      body = JSON.parse(body);
      if (body.search && body.search.length > 0) {
        const entityNode = body.search[0].id;
        let entityNodeType = '';
        const entityQuery = helper.replaceAll(queries.entity, '#entity_id', entityNode);
        let fullUrl = `${this.endpointUrl}?query=${encodeURIComponent(entityQuery)}`;
        fullUrl = `${fullUrl}&format=json`;
        // console.log('test ============= ' + fullUrl);
        fetch(fullUrl).then(res => res.json()).then((body) => {
          window.sessionStorage.setItem('wiki_query_subject_data', body.results.bindings);
          entityNodeType = helper.getPropertyValueByPropertyId(SparqlConstants.PROPS.INSTANCE_OF, body.results.bindings);
          const matchedValues = helper.matchValue(entityNodeType, SparqlConstants.VALUES.INSTANCE_OF);
          this.fetchSuggestions(matchedValues, body.results.bindings);
        });
      }
    }
  },

  fetchSuggestions(matchedValues, dataArray) {
    if (matchedValues && matchedValues.length > 0) {
      const matchedValue = matchedValues[0];
      switch (matchedValue) {
        case SparqlConstants.VALUES.INSTANCE_OF.HUMAN:
          const occupationKey = SparqlConstants.PROPS.PEOPLE.OCCUPATION.PID;
          // let occupationValues = helper.getPropertyValueByPropertyId(occupationKey, dataArray);
          const occupations = helper.getPropertiesByPropertyId(occupationKey, dataArray);
          dom.setHiddenValue(matchedValue, 'wizard3-instanceKeyHolder');
          dom.showWizardStep(occupations, '3', 'Following professions match with the subject selected, do you want to generate questions related to these professionals?');
          break;
        case SparqlConstants.VALUES.INSTANCE_OF.COUNTRY:
            // occupationKey = SparqlConstants.PROPS.PEOPLE.OCCUPATION.PID;
            // // let occupationValues = helper.getPropertyValueByPropertyId(occupationKey, dataArray);
            // occupations = helper.getPropertiesByPropertyId(occupationKey, dataArray);
            // dom.setHiddenValue(matchedValue, 'wizard3-instanceKeyHolder');
            // dom.showWizardStep(occupations, '3', 'Following professions match with the subject selected, do you want to generate questions related to these professionals?');
          break;
      }
    } else {
      dom.showTemplateError("Selected subject didn't match any of the usable instance types, please change selection.");
    }
  },

  processResponseFromTemplateParser(responseFromTemplateParser) {
    responseFromTemplateParser = JSON.parse(responseFromTemplateParser);
    if (responseFromTemplateParser) {
      const topics = responseFromTemplateParser.topics;
      const nouns = responseFromTemplateParser.nouns;
      if (topics && topics.length == 1) {
        const topic = topics[0].normal;
        dom.showWizardStep(topic, '2', 'Topic Identified, please confirm');
        // this.determineNodeAndCategory(topic);
      } else if (nouns) {
        if (nouns.length == 0) {
          dom.showTemplateError('Unable to extract usable nouns, please try again with a different template');
        } else if (nouns.length == 1) {
          const topic = nouns[0];
          dom.showWizardStep(topic, '2', 'None of the terms could be identified as topic, please confirm to use below noun as topic.');
          // this.determineNodeAndCategory(topic);
        } else {
          dom.showWizardStep(nouns, '2', 'Following subjects were identified as potential subjects, please select the one to use as primary for questions.');
        }
      }
    } else {
      dom.showTemplateError();
    }
  },

  // ================================= SERVICES for SERVER-SIDE CALLS ======================================== //
  // determineNodeAndCategoryInternal() {
  //     if (!err1 && res1.statusCode === 200 && body1 && body1.search && body1.search.length > 0) {
  //         entityNode = body1.search[0].id;
  //         let entityNode = '';
  //         let entityNodeType = '';
  //         let entityQuery = queries.entity.replace('#entity_id', entityNode);
  //         let fullUrl = this.endpointUrl + '?query=' + encodeURIComponent(entityQuery);
  //         console.log('test ============= ' + fullUrl);
  //         request.get(fullUrl, headers, function (err2, res2, body2) {
  //             if (!err2 && res2.statusCode === 200 && body2 && body2.length > 0) {
  //                 console.log(body2);
  //             } else {
  //                 console.log(err2);
  //             }
  //         })
  //     }
  // }

};
