const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser=require('body-parser');
require('./models/user.js');// because its not returning any thing
require('./models/survey.js');// because its not returning any thing
require('./services/passport.js');// because its not returning any thing
const keys=require('./config/keys.js');// to access keys

mongoose.connect(keys.mongoURI);

const cookieSession=require('cookie-session'); // to manage cookie and session for express server

const app=express();
app.use(bodyParser.json()); // parsing data or middleware to server 
app.use( cookieSession({
		maxAge:30*24*60*60*1000,// time to save cookie in the browser
		keys:[keys.cookieKey]// setting key to this cookie
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app)// for login purpose 
require('./routes/billingRoutes.js')(app)// for billing porpose

if(process.env.NODE_ENV==="production"){
	//if ode is working in prdocution to serve static page
	app.use(express.static("client/build"));
	const path=require("path");
	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
