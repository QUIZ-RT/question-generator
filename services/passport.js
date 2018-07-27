const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('../config/keys.js');
const mongoose=require('mongoose');// create object of mongoose
const User=mongoose.model("users");// accessing save schema in mongoDB which is done in the user.js

passport.serializeUser((user,done)=>{
	done(null,user.id);// user id is autogenereted by monogo db
})
passport.deserializeUser((id,done)=>{
	User.findById(id).then(user=>{
		done(null,user);
	});
});

passport.use(new googleStrategy({//2.whenever oing to hit auth/google. internally this method will call.=>move to authroutes.js
	clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy:true
	},
	/*(accessToken, refreshToken, profile, done)=>{//4. on sucess it will come to this function
		User.findOne({googleId:profile.id}).then( (exitingUser)=>{// promise call success 
			if(!exitingUser){
				new User({googleId:profile.id,name:profile.displayName}).save().then(user=>done(null,user));
			}
			else{
				done(null,exitingUser);
			}
		});
	}*/ // same code with async keyword
	async (accessToken, refreshToken, profile, done)=>{//4. on sucess it will come to this function
	const exitingUser = await User.findOne({googleId:profile.id});// promise call success 
			if(!exitingUser){
				const user =	await new User({googleId:profile.id,name:profile.displayName}).save();
				return done(null,user);
			}
			else{
				done(null,exitingUser);
			}	
	}
	)
);
// passport strategy done
