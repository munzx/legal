'use strict';

//Dependencies
var fs = require("fs"),
	mongoose = require('mongoose'),
	_ = require('lodash'),
	errorHandler = require('./error');

module.exports.index = function (req, res, next) {
	// Use it however you wish
	res.status(200).jsonp('Bism Allah');
}