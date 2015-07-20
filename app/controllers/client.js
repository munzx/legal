'use strict';

var mongoose = require('mongoose'),
	users = require('../models/user'),
	errorHandler = require('./error'),
	_ = require('lodash');

module.exports.index = function (req, res) {
	users.find({'role': 'client'}, {password: 0}, function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}