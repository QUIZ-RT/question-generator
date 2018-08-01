const $templateParser = require('./templateParser.js');
import Constants from '../shared/constants';

module.exports = { 
    getNodeDataFor: function(item) {
        console.log(item)
        let endpointUrl = Constants.END_POINT_URL,
            sparqlQuery = `SELECT ?item ?itemLabel 
                            WHERE 
                            {
                                ?item wdt:P31 wd:Q146.
                                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
                            }`,
            fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
            headers = { 'Accept': 'application/sparql-results+json' };

        fetch(fullUrl, { headers }).then(body => body.json()).then(json => {
            this.generateQuestions(json);
        });
    },

    generateQuestions: function(json) {
        const { head: { vars }, results } = json;
        for (const result of results.bindings) {
            for (const variable of vars) {
                console.log('%s: %o', variable, result[variable]);
            }
            console.log('---');
        }
    }
}