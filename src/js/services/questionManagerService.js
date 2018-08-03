import Constants from '../shared/constants';
import {
    queries
} from './../queries/sparqueries';

module.exports = {
    endpointUrl: Constants.END_POINT_URL,
    countryToCityMap: {},
    default_number_of_options: 3,

    getNodeDataFor(compromiseResponse) {
        let generatedTopic = compromiseResponse.topics[0].normal;
        let topicCategory = compromiseResponse.givenTopic;
        this.constructCountryToCityMap(this.generateQuestions, topicCategory);
    },

    constructCountryToCityMap(callback, topicCategory) {
        let self = this;
        //let countryToCityMap = {};
        let cityQuery = queries.distinct_countries,
            fullUrl = this.endpointUrl + '?query=' + encodeURIComponent(cityQuery),
            headers = {
                'Accept': 'application/sparql-results+json'
            };
        // cityQuery = cityQuery.replace('#countryCode', countryCode);
        fetch(fullUrl, {
            headers
        }).then(body => body.json()).then(json => {
            const {
                head: {
                    vars
                },
                results
            } = json;
            let cityArray = [];
            for (const result of results.bindings) {
                let countryId = result['country']['value'];
                let city = result['placeofbirthLabel']['value'];
                if (self.countryToCityMap[countryId]) {
                    cityArray = self.countryToCityMap[countryId];
                } else {
                    cityArray = [];
                    self.countryToCityMap[countryId] = cityArray;
                }
                if (!cityArray.includes(city))
                    cityArray.push(city)
                // console.log(result['country']['value'])
                // console.log(result['placeofbirthLabel']['value']);
            }
            callback(self, topicCategory);
            //console.log(countryToCityMap);
        });
    },


    generateQuestions(selfRef, topicCategory) {
        let sparqlQuery = queries.cricketer_query,
            fullUrl = selfRef.endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
            headers = {
                'Accept': 'application/sparql-results+json'
            };

        fetch(fullUrl, {
            headers
        }).then(body => body.json()).then(json => {
            const {
                head: {
                    vars
                },
                results
            } = json;
            for (const result of results.bindings) {
                let questionObj = {};
                questionObj.questionId = 'QID_' + selfRef.generateId();
                questionObj.question = result.questionlabel.value;
                //console.log(questionObj.question);
                questionObj.answer = result.placeofbirthLabel.value;
                questionObj.topic = topicCategory;
                let options = selfRef.generateOptions(result['country']['value'])
                options.push(questionObj.answer);
                questionObj.options = options;
                console.log(questionObj)
            }
        });
    },

    generateOptions(countryCode, number_of_options) {
        let allOptions = this.countryToCityMap[countryCode];
        let optionIndices = [];
        let options = [];
        if (number_of_options)
            optionIndices = this.generateRange(number_of_options, 0, allOptions.length - 1);
        else
            optionIndices = this.generateRange(this.default_number_of_options, 0, allOptions.length - 1);
        for (const index of optionIndices) {
            options.push(allOptions[index]);
        }
        return options;
    },

    generateRange(pCount, pMin, pMax) {
        let min = pMin < pMax ? pMin : pMax;
        let max = pMax > pMin ? pMax : pMin;
        if (pMax < pCount) {
            pCount = pMax;
        }
        var resultArr = [],
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
        counter = counter + 1;
        window.localStorage.setItem('id_counter1', counter);
        return counter;
    },

    generateOptions(countryCode, countryLabel) {
        let cityQuery = queries.city_query,
            fullUrl = `${this.endpointUrl}?query=${encodeURIComponent(cityQuery)}`,
            headers = {
                Accept: 'application/sparql-results+json'
            };
        cityQuery = cityQuery.replace('#countryCode', countryCode);
        fetch(fullUrl, {
            headers
        }).then(body => body.json()).then((json) => {
            const {
                head: {
                    vars
                },
                results,
            } = json;
            for (const result of result.bindings) {
                console.log(countryLabel);
                console.log(result);
            }
        });
    }

};
