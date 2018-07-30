const passport=require('passport');

module.exports=(app)=>{
	app.get('/auth/google',passport.authenticate('google',{//1. making call to google for access=>move to passport.js
		scope:['profile','email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google',{scope:['profile','email']}),
		(req,res)=>{
			res.redirect("/surveys")
		}
	);//3. with code got call from google=>move to passport.js

	app.get('/api/current_user',(req,res)=>{// it will current user detail on screan
		res.send(req.user);
		console.log(req.user);
	});

	app.get('/api/logout',(req,res)=>{// its going to kill current session with the help of passport js and clear cookie
		req.logout();
		res.redirect("/");
	});

	app.get('/api/test',(req,res)=>{// it will current user detail on screan
		res.send("Hello");
		console.log(req);
	});
}
