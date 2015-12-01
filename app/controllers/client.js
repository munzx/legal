'use strict';

var mongoose = require('mongoose'),
	users = require('../models/user'),
	errorHandler = require('./error'),
	_ = require('lodash');

module.exports.index = function (req, res) {
	users.find({'role': 'client'}, {password: 0}).sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.available = function (req, res) {
	users.find({'role': 'client', removed: 'false'}, {password: 0}).sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}