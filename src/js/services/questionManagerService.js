import { SparqlConstants } from '../shared/sparqlConstants';
import { Helper } from '../utils/helper';
import { DomService } from './domService';

const helper = new Helper();
const queries = require('./../queries/sparqueries');

const dom = new DomService();
let ajaxMsg='';
function pushDataToQuizEngine(quizData) {
  $.ajax({
    header: {
      'Access-Control-Allow-Origin': '*'
    },
    url: 'https://game-engine-beta.herokuapp.com/api/questions',          
    dataType: 'json',
    cors: 'no-cors',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(quizData),
    success(msg) {
      console.log(msg);
    },
    error(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);  
    },
  });
}
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
    const cityQuery = queries.distinct_countries,
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
    let self = this;
    const instanceType = dom.getHiddenValue('wizard3-instanceKeyHolder');
    const instanceTypeValue = window.sessionStorage.getItem('instanceType');
    let selectedProperties = [];
    const propUrls = [];
    switch (instanceType) {
      case SparqlConstants.VALUES.INSTANCE_OF.HUMAN:
        let query = queries.person_query;
        selectedProperties = SparqlConstants.PROPS.PEOPLE;
        Object.keys(selectedProperties).forEach((key) => {
            const selectedProperty = selectedProperties[key];
            // if(selectedProperty.IS_DATE) {
            //   query = queries.person_date_query;
            // }
            // let selectedProperty = selectedProperties[key];
            if(selectedProperty.PID === 'P106') {
                return true;
            }
            const sparqConcat = helper.convertToSparqConcat(selectedProperty.QUESTION_TEMPLATE);
            query = `${helper.replaceAll(query, '#INSTANCE_OF', SparqlConstants.VALUES.INSTANCE_OF.HUMAN)}`;
            query = `${query.replace('#PRIMARY_FILTER', SparqlConstants.PROPS.PEOPLE.OCCUPATION.PID)}`;
            query = `${query.replace('#PRIMARY_FILTER_VALUE', itemsArray[0])}`;
            query = `${helper.replaceAll(query, '#PROPERTY', selectedProperty.PID)}`;
            query = `${helper.replaceAll(query, '#TEMPLATE', sparqConcat)}`;
            // console.log(sparqlQuery);
            if(selectedProperty.IS_DATE) {
              propUrls.push({'key': key, 'IS_DATE':true, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(query)}`});
            } else {
              propUrls.push({'key': key, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(query)}`});
            }
            query = queries.person_query;
        })
        break;
      case SparqlConstants.VALUES.INSTANCE_OF.FILM:
        query = queries.general_query;
        selectedProperties = SparqlConstants.PROPS[instanceTypeValue];
        Object.keys(selectedProperties).forEach((key) => {
          const selectedProperty = selectedProperties[key];
          let languages = [];
          // if(selectedProperty.IS_DATE) {
          //   query = queries.general_date_query;
          // }
          if(topicCategory && (topicCategory.toLowerCase() === 'bollywood')) {
            languages.push(SparqlConstants.VALUES.LANGUAGE_OF_WORK.HINDI);
          } else if(topicCategory && (topicCategory.toLowerCase() === 'hollywood')) {
            languages.push(SparqlConstants.VALUES.LANGUAGE_OF_WORK.ENGLISH);
          } else {
            languages.push(SparqlConstants.VALUES.LANGUAGE_OF_WORK.ENGLISH);
            languages.push(SparqlConstants.VALUES.LANGUAGE_OF_WORK.HINDI);
          }
          query = helper.addQueryFilter(query, SparqlConstants.PROPS.LANGUAGE_OF_WORK, languages);
          const sparqConcat = helper.convertToSparqConcat(selectedProperty.QUESTION_TEMPLATE);
          query = `${helper.replaceAll(query, '#INSTANCE_OF', SparqlConstants.VALUES.INSTANCE_OF[instanceTypeValue])}`;
          query = `${helper.replaceAll(query, '#PROPERTY', selectedProperty.PID)}`;
          query = `${helper.replaceAll(query, '#TEMPLATE', sparqConcat)}`;
          // console.log(query);
          if(selectedProperty.IS_DATE) {
            propUrls.push({'key': key, 'IS_DATE':true, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(query)}`});
          } else {
            propUrls.push({'key': key, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(query)}`});
          }
          query = queries.general_query;
        })
        break;
      default:
        query = queries.general_query;
        selectedProperties = SparqlConstants.PROPS[instanceTypeValue];
        Object.keys(selectedProperties).forEach((key) => {
          const selectedProperty = selectedProperties[key];
          // if(selectedProperty.IS_DATE) {
          //   query = queries.general_date_query;
          // }
          const sparqConcat = helper.convertToSparqConcat(selectedProperty.QUESTION_TEMPLATE);
          query = `${helper.replaceAll(query, '#INSTANCE_OF', SparqlConstants.VALUES.INSTANCE_OF[instanceTypeValue])}`;
          query = `${helper.replaceAll(query, '#PROPERTY', selectedProperty.PID)}`;
          query = `${helper.replaceAll(query, '#TEMPLATE', sparqConcat)}`;
          // console.log(query);
          if(selectedProperty.IS_DATE) {
            propUrls.push({'key': key, 'IS_DATE':true, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(query)}`});
          } else {
            propUrls.push({'key': key, 'URL': `${SparqlConstants.END_POINT_URL}?query=${encodeURIComponent(query)}`});
          }
          query = queries.general_query;
        })
        break;
    }
    if(propUrls) {
      dom.resetCounter('qCount');
      self.generateQuestionsRecursive(propUrls, 0, topicCategory, []);
    }
  },

  generateQuestionsRecursive(propsArray, propsIndex, topicCategory, quesArray) {
    let self = this;
    if (propsIndex > propsArray.length - 1) {
      window.localStorage.setItem('question_data', JSON.stringify(quesArray));
      $('#btnQGSubmit').removeAttr('disabled');
      // self.getConfirmationOnGenerated(propertyQuestionMap);
      return;
    }
    if(propsIndex == 1) {
      dom.displaySpinner();
    }
    let isDate = propsArray[propsIndex]['IS_DATE'];
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
          if(isDate) {
            if(result && result.property && result.property.value.includes('T')) {
              questionObj.answer = result.property.value.substr(0, result.property.value.indexOf('T'));
            } else {
              questionObj.answer = result.property.value;
            }
          } else {
            questionObj.answer = result.propertyLabel.value;
          }
          questionObj.topic = topicCategory;
          const options = helper.generateOptions(result, results.bindings, 3, isDate);
          options.push(questionObj.answer);
          questionObj.options = options;
          quesArrayPerProperty.push(questionObj);
          dom.updateCounter('qCount');
        }
        // propertyQuestionMap[property] = quesArrayPerProperty;
        quesArray = quesArray.concat(quesArrayPerProperty);
        // TODO : show result here
        dom.removeSpinner();
        self.getConfirmationOnGenerated(quesArrayPerProperty, property);
        self.generateQuestionsRecursive(propsArray, ++propsIndex, topicCategory, quesArray);
      });
  },

  getConfirmationOnGenerated(quesArrayPerProperty, property) {
    dom.showGeneratedQuestionDisplayer(quesArrayPerProperty, property);
  },
  saveQuestions(quesArray) {
    debugger;
    quesArray = helper.shuffle(quesArray);
    let arrayOfQuesionArray = helper.chunkArray(quesArray, 300);
    window.localStorage.setItem('questions_data_for_QE', JSON.stringify(arrayOfQuesionArray));
    this.saveQuestionsShuffledAndChunked(arrayOfQuesionArray, 0, '/firebase/api/questions', 'Question Generator');
  },

  saveQuestionsShuffledAndChunked(arrayOfQuesionArray, index, db, appName) {
    let self = this;
    if(index > arrayOfQuesionArray.length - 1) {
      dom.showTemplateSuccess('Generated questions have been pushed to DB Successfully!')
      ajaxMsg = ajaxMsg.replace('#count', dom.getCount('qCount'));
      dom.showTemplateSuccess(ajaxMsg);
      dom.removeSpinner();
      if(appName === 'Question Generator') {
        dom.displayConfirmQESubmitModal();
      }
      return;
    }
    let questionsChunk = arrayOfQuesionArray[index];
    $.ajax({
      header: {
        'Access-Control-Allow-Origin': '*'
      },
      url: db,
      dataType: 'json',
      type: 'post',
      cors: 'no-cors',
      contentType: 'application/json',
      data: JSON.stringify(questionsChunk),
      success(data) {
        //self.syncQuestionsWithQEngine(quesArray);
        let questionCountInserted = dom.getCount('qCount');
        ajaxMsg = 'Successfully Inserted Data in DB and syncing data to Quiz Engine';
        pushDataToQuizEngine(data);
        ajaxMsg = `Inserted ${questionCountInserted} questions in ${appName} DB`;
        console.log(data);
        self.saveQuestionsShuffledAndChunked(arrayOfQuesionArray, ++index, db, appName);
      },
      error(jqXhr, textStatus, errorThrown) {
        ajaxMsg = errorThrown;
        alert(errorThrown);
      },
    });
  },
  // syncQuestionsWithQEngine(quesArray) {
  //   let engineURI = `/api/questionManager/syncQuestions?engineURL=${encodeURIComponent('https://quiz-engine.herokuapp.com/api/questions')}`;
  //   fetch(engineURI, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //     }, 
  //     body:  JSON.stringify(quesArray) 
  //   }).then(body => body.json()).then((json) => {
  //     console.log('Question posted to Engine' + json);
  //   });
  //   // $.ajax({
  //   //   url: 'https://quiz-engine.herokuapp.com/api/questions',
  //   //   dataType: 'json',
  //   //   type: 'post',
  //   //   contentType: 'application/json',
  //   //   data: JSON.stringify(quesArray),
  //   //   success(data) {
  //   //     console.log(data);
  //   //   },
  //   //   error(jqXhr, textStatus, errorThrown) {
  //   //     console.log(errorThrown);
  //   //   },
  //   // });
  // },

  determineNodeAndCategory(subject) {
    const entityURL = SparqlConstants.WIKI_ENTITY_SEARCH_URL.replace('#entity', subject);
    const headers = { Accept: 'application/sparql-results+json' };
    const entityURLWrapper = `/api/questionManager/determineNodeAndCategory?entityURL=${encodeURIComponent(entityURL)}`;
    fetch(entityURLWrapper, headers)
      .then(res => res.json())
      .then(body => this.processEntityURLResponse(body));
  },

  processEntityURLResponse(bodyObj) {
    if (bodyObj) {
      const body = JSON.parse(bodyObj);
      if (body.search && body.search.length > 0) {
        const entityNode = body.search[0].id;
        let entityNodeType = '';
        const entityQuery = helper.replaceAll(queries.entity, '#entity_id', entityNode);
        let fullUrl = `${this.endpointUrl}?query=${encodeURIComponent(entityQuery)}`;
        fullUrl = `${fullUrl}&format=json`;
        // console.log('test ============= ' + fullUrl);
        fetch(fullUrl).then(res => res.json()).then((response) => {
          window.sessionStorage.setItem('wiki_query_subject_data',
            response.results.bindings);
          entityNodeType = helper.getPropertyValueByPropertyId(SparqlConstants.PROPS.INSTANCE_OF,
            response.results.bindings);
          const matchedValues = helper.matchValue(entityNodeType,
            SparqlConstants.VALUES.INSTANCE_OF);
          this.fetchSuggestions(matchedValues, response.results.bindings);
        });
      }
    }
  },

  fetchSuggestions(matchedValues, dataArray) {
    if (matchedValues && matchedValues.length > 0) {
      const matchedValue = matchedValues[0];
      switch (matchedValue) {
        case SparqlConstants.VALUES.INSTANCE_OF.HUMAN: {
          const occupationKey = SparqlConstants.PROPS.PEOPLE.OCCUPATION.PID;
          const occupations = helper.getPropertiesByPropertyId(occupationKey, dataArray);
          dom.setHiddenValue(matchedValue, 'wizard3-instanceKeyHolder');
          dom.showWizardStep(occupations, '3', 'Following professions match with the subject selected, do you want to generate questions related to these professionals?');
          break;
        }
        default:
          dom.setHiddenValue(matchedValue, 'wizard3-instanceKeyHolder');
          let instanceValue = helper.getValueByValueId(matchedValue, SparqlConstants.VALUES);
          window.sessionStorage.setItem('instanceType', instanceValue);
          dom.showWizardStep(instanceValue, '3', 'Selected topic is an instance of below type, please click "Generate" to generate questions of below type.');
          break;
      }
    } else {
      dom.showTemplateError("Selected subject didn't match any of the usable instance types, please change selection.");
    }
  },

  processResponseFromTemplateParser(responseFromTemplateParserObj) {
    const responseFromTemplateParser = JSON.parse(responseFromTemplateParserObj);
    if (responseFromTemplateParser) {
      const { topics, nouns } = responseFromTemplateParser;
      if (topics && topics.length === 1) {
        const topic = topics[0].normal;
        dom.showWizardStep(topic, '2', 'Topic Identified, please confirm');
      } else if (nouns) {
        if (nouns.length === 0) {
          dom.showTemplateError('Unable to extract usable nouns, please try again with a different template');
        } else if (nouns.length === 1) {
          const topic = nouns[0];
          dom.showWizardStep(topic, '2', 'None of the terms could be identified as topic, please confirm to use below noun as topic.');
        } else {
          dom.showWizardStep(nouns, '2', 'Following subjects were identified as potential subjects, please select the one to use as primary for questions.');
        }
      }
    } else {
      dom.showTemplateError();
    }
  },
};
