const fs = require('fs');

let rawdata = fs.readFileSync('./db.json');  
let db = JSON.parse(rawdata);
let questionsMaster = db.questions; 

module.exports = app => {

  app.get('/api/questions', (req, res) => {// it will current user detail on screan
    res.json(questionsMaster);
    console.log(req);
  });

  app.get('/api/questions/:id', (req, res) => {// it will current user detail on screan
    let retResult= {};
    retResult  = questionsMaster.filter(function(question){
      return question.id == req.params.id ;
    })
    res.json(retResult);
    console.log(req);
  });

};
