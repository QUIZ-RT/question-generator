const express = require('express');
const bodyParser = require('body-parser');

const cookieSession = require('cookie-session'); // to manage cookie and session for express server

const app = express();

app.use(bodyParser.json()); // parsing data or middleware to server

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // time to save cookie in the browser
  keys: [keys.cookieKey], // setting key to this cookie
}));

require('./src/js/routes/questionManagerRoutes')(app);
// require('./routes/questionManagerRoutes')(app);
require('./firebase/firebase-route')(app);

if (process.env.NODE_ENV === 'production') {
  // if ode is working in prdocution to serve static page
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = 8081;// process.env.PORT || 5000;

app.get('/api/test1', (req, res) => { // it will current user detail on screan
  res.send('Hello');
  console.log('request received ');
});

app.listen(PORT);
