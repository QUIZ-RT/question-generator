/**
 * Author: mahendra
 */
let appMiddleware = {}; 
appMiddleware.init = (app, jsonWebToken) => {
	let middleware = (req, res, next) => {
		if(req.path === "/" || req.path === "/register" || req.path === "/authUser"){
			next();
		}else{
			let token = req.body.token || req.query.token || req.headers['authorization'];
			if (token) {
				// verifies secret and checks exp
				jsonWebToken.verify(token, app.get('jwtSecret'), (err, decoded) => {
					if (err) {
						return res.json({ success: false, message: 'Failed to authenticate token.' });    
					} else {
						req.token = decoded;
						next();
					}
				});
			} else {
				return res.status(403).send({ 
					success: false, 
					message: 'No token provided.' 
				});
			}
		}
	}
	return middleware;
}

module.exports = appMiddleware;