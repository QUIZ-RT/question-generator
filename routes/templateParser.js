const nlp = require('compromise');

module.exports = {

  retrievePartialProcessedInfo(templates) {
    const response = {};
    if (templates) {
      const template = templates.toLowerCase();
      const words = template.split(" ");
      console.log(words);
      if(words.length === 1) {
        response.topics = [
            {'normal': words[0]}
          ];
        response.template = template;
        return response;
      }
      const doc = nlp(template);
      response.topics = doc.topics().data();
      response.nouns = doc.nouns().out('array');
      response.template = template;
      console.log(template);
      // response.fixedPart = template.replace(response.nouns[0], '');
      return response;
    }
    console.log(`Please correct question Template: ${templates}`);
    response.error = "Question template might be incorrect";
    return response;
  },
  
}
