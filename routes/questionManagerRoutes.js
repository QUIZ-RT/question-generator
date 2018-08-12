const templateService = require('./templateParser');
const request = require('request');

module.exports = app => {

    // app.get('/', function (req, res, next) {
    //     // document.write('this is we are loading to js');
    //     // alert('in JS');
    //     res.render('index');
    // });

  app.get('/api/questionManager/parseTemplate', (req, res) => {
    let subjects = {};
    if (req) {
      const data = req.query.template;
      if (data) {
        subjects = templateService.retrievePartialProcessedInfo(data);
      }
    }
    res.json(JSON.stringify(subjects));
  });

  app.get('/api/questionManager/determineNodeAndCategory', (req, res) => {
    if(req) {
      let entityURL = req.query.entityURL;
      let headers = {'Accept': 'application/sparql-results+json'};
      request.get(entityURL, headers, (err, response, body) => {
          if (!err && response.statusCode === 200 && body && body.length > 0) {
            res.json(body);
          } else {
            res.json(err);
          }
      })
    }
  });

  // app.post('/api/questionManager/syncQuestions', (req, res) => {
  //   if(req) {
  //     let engineURL = req.query.engineURL;
  //     let headers = {'Accept': 'application/sparql-results+json'};
  //     let inbody = req.body;
  //     console.log(typeof inbody);
  //     request.post({
  //       'headers': headers,
  //       'url': engineURL,
  //       'body': JSON.stringify(inbody)
  //     }, function(err, response, body){
  //       if (!err && response.statusCode === 200 && body && body.length > 0) {
  //         console.log(body)
  //         res.json("success ============================= " + body);
  //       } else {
  //         console.log("error ============================ " + err); 
  //         res.json(err);
  //       }
  //     });
  //   }
  // })
};
