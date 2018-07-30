const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');// get the path of the directories
const keys = require('./config/keys.js');// to access keys
const cookieSession = require('cookie-session'); // to manage cookie and session for express server

const app = express();// create obj of the express

app.use(bodyParser.json()); // parsing data or middleware to server 

app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,// time to save cookie in the browser
	keys: [keys.cookieKey]// setting key to this cookie
})
);
app.use(express.static('dist'));//it will prefer the directory to serve the file

require('./routes/questionRoutes.js')(app)// for question related endpoints  
require('./routes/topicRoutes.js')(app)// for topics related endpoints  

const PORT = process.env.PORT || 8080;// finding the port number 

app.listen(PORT, function () {
	console.log('Listening on  port 8080');
});
console.log('Application started....');
