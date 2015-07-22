'use strict';

var mongoose = require('mongoose'),
	cases = require('../models/case'),
	errorHandler = require('./error'),
	_ = require('lodash'),
	users = require('../models/user');


module.exports.index = function (req, res) {
	cases.find({}, function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}