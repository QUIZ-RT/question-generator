import Constants from '../shared/constants';
import {
  queries,
} from '../queries/sparqueries';

module.exports = {
  endpointUrl: Constants.END_POINT_URL,
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
      headers = {
        Accept: 'application/sparql-results+json',
      };
    // cityQuery = cityQuery.replace('#countryCode', countryCode);
    fetch(fullUrl, {
      headers,
    }).then(body => body.json()).then((json) => {
      const {
        head: {
          vars,
        },
        results,
      } = json;
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
      callback(self, topicCategory, '', self.saveQuestions);
      // console.log(countryToCityMap);
    });
  },


  generateQuestions(selfRef, topicCategory, template, dataLayerCallback) {
    let sparqlQuery = queries.query,
      fullUrl = `${selfRef.endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`,
      headers = {
        Accept: 'application/sparql-results+json',
      },
      quesArray = [];

    fetch(fullUrl, {
      headers,
    }).then(body => body.json()).then((json) => {
      const {
        head: {
          vars,
        },
        results,
      } = json;
      for (const result of results.bindings) {
        const questionObj = {};
        questionObj.questionId = `QID_${selfRef.generateId()}`;
        questionObj.question = result.questionlabel.value;
        // console.log(questionObj.question);
        questionObj.answer = result.placeofbirthLabel.value;
        questionObj.topic = topicCategory;
        const options = selfRef.generateOptions(result.country.value);
        options.push(questionObj.answer);
        questionObj.options = options;
        quesArray.push(questionObj);
        console.log(questionObj);
      }
      dataLayerCallback(quesArray);
    });
  },
  saveQuestions(quesArray) {
    console.log(`after : ${quesArray}`);
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
  generateOptions(countryCode, number_of_options) {
    const allOptions = this.countryToCityMap[countryCode];
    let optionIndices = [];
    const options = [];
    if (number_of_options) optionIndices = this.generateRange(number_of_options, 0, allOptions.length - 1);
    else optionIndices = this.generateRange(this.default_number_of_options, 0, allOptions.length - 1);
    for (const index of optionIndices) {
      options.push(allOptions[index]);
    }
    return options;
  },

  generateRange(pCount, pMin, pMax) {
    const min = pMin < pMax ? pMin : pMax;
    const max = pMax > pMin ? pMax : pMin;
    if (pMax < pCount) {
      pCount = pMax;
    }
    let resultArr = [],
      randNumber;
    while (pCount > 0) {
      randNumber = Math.round(min + Math.random() * (max - min));
      if (resultArr.indexOf(randNumber) == -1) {
        resultArr.push(randNumber);
        pCount--;
      }
    }
    return resultArr;
  },

  generateId() {
    let counter;
    if (window.localStorage.getItem('id_counter1')) {
      counter = parseInt(window.localStorage.getItem('id_counter1'));
    } else {
      counter = 0;
    }
    counter += 1;
    window.localStorage.setItem('id_counter1', counter);
    return counter;
  },

};
