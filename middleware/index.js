/**
 * Author: mahendra
 */
let middleWare = {},
appMiddleware = require('./app-middleware');

middleWare.init = (app, jsonWebToken) => {
	appMiddleware.init(app, jsonWebToken);
};

module.exports = middleWare;