'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./error'),
	users = require('../models/user'),
	cases = require('../models/case'),
	defendants = require('../models/defendant'),
	_ = require('lodash');


module.exports.index = function (req, res) {
	defendants.find({}, function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}