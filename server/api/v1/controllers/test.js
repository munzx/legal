'use strict';

//Dependencies
var fs = require("fs"),
	mongoose = require('mongoose'),
	_ = require('lodash'),
	errorHandler = require('./error');

module.exports.index = function (req, res, next) {
	// Use it however you wish
	// req.feeds.reader(function (err, result) {
	// 	if(err){
	// 		res.status(500).jsonp(err);
	// 	} else {
	// 		res.status(200).jsonp(result);
	// 	}
	// });
	res.status(200).jsonp('Bism Allah');
}