const fs = require('fs');

const rawdata = fs.readFileSync('./db.json');
const db = JSON.parse(rawdata);
const topicsMaster = db.topics;

module.exports = (app) => {
  app.get('/api/topics', (req, res) => { // it will current user detail on screan
    res.json(topicsMaster);
    console.log(req);
  });

  app.get('/api/topics/:id', (req, res) => { // it will current user detail on screan
    let retResult = {};
    retResult = topicsMaster.filter(topic => topic.id === req.params.id);
    res.json(retResult);
    console.log(req);
  });
};
