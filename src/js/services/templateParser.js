var nlp = require('compromise');

module.exports = {

    retrievePotentialSubjects(template) {
        let subjects = {};
        if(template) {
            template = template.toLowerCase();
            doc = nlp(template);
            subjects.topics = doc.topics().data();
            subjects.nouns = doc.nouns().out('array');
            return subjects;
        }
        console.log("Please check question Template: " + template)
        return {};
    }

}