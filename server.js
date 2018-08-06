const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');// get the path of the directories
const jsonWebToken = require('jsonwebtoken');


const app = express();// create obj of the express

app.use(bodyParser.json()); // parsing data or middleware to server

app.use(express.static('dist'));// it will prefer the directory to serve the file

// Initializing Middleware
let middleware = require('./middleware/app-middleware').init(app, jsonWebToken);
app.set('jwtSecret', 'ashkdbahbhabcjhbahbcjhabsuhqaedgqwdvuqbc');
const packages = {
  app,
  jsonWebToken,
  middleware,
  express
};

require('./routes/questionRoutes.js')(app)// for question related endpoints
require('./routes/topicRoutes.js')(app)// for topics related endpoints
require('./routes/questionManagerRoutes.js')(app)// for question related endpoints

const PORT = process.env.PORT || 8080;// finding the port number
require('./firebase/firebase-route')(app);

// User routes
let userRouter = require('./routes/userRouter')(packages);
app.use(userRouter);
 
app.listen(PORT, () => {
  console.log('Listening on  port 8080');
});
console.log('Application started....');
