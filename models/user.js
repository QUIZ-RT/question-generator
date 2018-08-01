const mongoose=require('mongoose');
//const schema=mongoose.Schema  ======= below line is same this one
const { Schema }=mongoose;

const userSchema= new Schema({// create new schema object in mongo
	googleId:String,
	name:String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users',userSchema);// set schema in mongo so we can use it anywhere