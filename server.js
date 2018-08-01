const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');// get the path of the directories

const app = express();// create obj of the express

app.use(bodyParser.json()); // parsing data or middleware to server

app.use(express.static('dist'));// it will prefer the directory to serve the file

<<<<<<< HEAD
require('./src/js/routes/questionRoutes.js')(app)// for question related endpoints  
require('./src/js/routes/topicRoutes.js')(app)// for topics related endpoints  
require('./src/js/routes/questionManagerRoutes.js')(app)// for question related endpoints  
// require('./routes/questionRoutes.js')(app)// for question related endpoints  
// require('./routes/topicRoutes.js')(app)// for topics related endpoints  
// require('./routes/questionManagerRoutes.js')(app)// for question related endpoints  
=======
const PORT = process.env.PORT || 8080;// finding the port number
>>>>>>> 33b3800ac925f47cb7ccffbc165bd8add6cd6f9b

app.listen(PORT, () => {
  console.log('Listening on  port 8080');
});
console.log('Application started....');
