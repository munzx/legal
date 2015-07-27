'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./error'),
	users = require('../models/user'),
	cases = require('../models/case'),
	defendants = require('../models/defendant'),
	_ = require('lodash');


module.exports.index = function (req, res) {
	defendants.find({}).sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function(req, res){
	var defendant = new defendants,
		defendantInfo = _.extend(defendant, req.body.defendantInfo);

	defendant.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);	
		}
	});
}

module.exports.remove = function(req, res){
	defendants.findById(req.params.id, function(err, defendant){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			defendant.remove(function(error){
				if(error){
					res.status(500).jsonp({message: error});
				} else {
					res.status(200).jsonp('تم محو بانات الخصم');
				}
			});
		}
	});
}