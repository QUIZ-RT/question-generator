import Constants from '../shared/constants';
import { queries } from './../queries/sparqueries';

module.exports = {
    endpointUrl: Constants.END_POINT_URL,

    getNodeDataFor: function (item) {
        let sparqlQuery = queries.cricketer_query,
            fullUrl = this.endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
            headers = { 'Accept': 'application/sparql-results+json' };

        fetch(fullUrl, { headers }).then(body => body.json()).then(json => {
            this.generateQuestions(json);
        });
    },

    generateQuestions: function (json) {
        // console.log('test' + json);
        const {
            head: { vars },
            results
        } = json;
        for (const result of results.bindings) {
            // for (const variable of vars) {
            //console.log("Where was " + result['personLabel']['value'] + " born?");
            this.generateOptions(result['country']['value'], result['countryLabel']['value'])
            // }
        }
    },

    generateOptions: function (countryCode, countryLabel) {
        let cityQuery = queries.city_query,
            fullUrl = this.endpointUrl + '?query=' + encodeURIComponent(cityQuery),
            headers = { 'Accept': 'application/sparql-results+json' };
        cityQuery = cityQuery.replace('#countryCode', countryCode);
        fetch(fullUrl, { headers }).then(body => body.json()).then(json => {
            const {
                head: { vars },
                results
            } = json;
            for (const result of result.bindings) {
                console.log(countryLabel)
                console.log(result);
            }
        });

    }

}
