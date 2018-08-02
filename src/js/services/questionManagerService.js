import Constants from '../shared/constants';

module.exports = {
  getNodeDataFor(item) {
    console.log(item);
    const endpointUrl = Constants.END_POINT_URL;


    const sparqlQuery = `SELECT ?item ?itemLabel 
                            WHERE 
                            {
                                ?item wdt:P31 wd:Q146.
                                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
                            }`;


    const fullUrl = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`;


    const headers = { Accept: 'application/sparql-results+json' };

    fetch(fullUrl, { headers }).then(body => body.json()).then((json) => {
      this.generateQuestions(json);
    });
  },

  // generateQuestions(json) {
  //   const { head: { vars }, results } = json;

  //   for (const result of results.bindings) {
  //     for (const variable of vars) {
  //       console.log('%s: %o', variable, result[variable]);
  //     }
  //   }
  // },
};
