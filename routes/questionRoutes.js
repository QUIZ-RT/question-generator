
const fs = require('fs');

const rawdata = fs.readFileSync('./db.json');
const db = JSON.parse(rawdata);
const questionsMaster = db.questions;

module.exports = (app) => {
  // app.get('/', (req, res) => {
  //   res.render('index.html');
  // });

  app.get('/api/questions', (req, res) => { // it will current user detail on screan
    res.json(questionsMaster);
    console.log(req);
  });

  app.get('/api/questions/:id', (req, res) => { // it will current user detail on screan
    let retResult = {};
    retResult = questionsMaster.filter(question => question.id == req.params.id);
    res.json(retResult);
    console.log(req);
  });
};
