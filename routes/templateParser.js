const nlp = require('compromise');

module.exports = {

  retrievePotentialSubjects(templates) {
    const subjects = {};
    if (templates) {
      const template = templates.toLowerCase();
      const doc = nlp(template);
      subjects.topics = doc.topics().data();
      subjects.nouns = doc.nouns().out('array');
      return subjects;
    }
    console.log(`Please check question Template: ${templates}`);
    return {};
  },

};
