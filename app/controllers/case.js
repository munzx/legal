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

module.exports.create = function(req, res){
	var newCase = new cases,
		caseInfo = _.extend(newCase, req.body.caseInfo);

	caseInfo.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.remove = function(req, res){
	cases.findById(req.params.id, function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			caseInfo.remove(function(error){
				if(err){
					res.status(500).jsonp({message: error});
				} else {
					res.status(200).jsonp('تم محو بيانات القضية بنجاح');
				}
			})
		}
	});
}