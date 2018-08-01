const fs = require('fs');

let rawdata = fs.readFileSync('./db.json');  
let db = JSON.parse(rawdata);
let topicsMaster = db.topics; 

module.exports = app => {
   
  app.get('/api/topics', (req, res) => {// it will current user detail on screan
    res.json(topicsMaster);
    console.log(req);
  });

  app.get('/api/topics/:id', (req, res) => {// it will current user detail on screan
    let retResult= {};
    retResult  = topicsMaster.filter(function(topic){
      return topic.id == req.params.id ;
    })
    res.json(retResult);
    console.log(req);
  });

};
