const mongoose=require('mongoose');
//const schema=mongoose.Schema  ======= below line is same this one
const { Schema }=mongoose;

const surveySchema= new Schema({// create new schema object in mongo
	title:String,
	subject:String,
	body:String,
	recipients:[String]

});

mongoose.model('surveys',surveySchema);// set schema in mongo so we can use it anywhere