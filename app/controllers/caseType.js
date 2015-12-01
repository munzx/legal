'use strict';

var mongoose = require('mongoose'),
	caseTypes = require('../models/caseType'),
	errorHandler = require('./error'),
	_ = require('lodash'),
	users = require('../models/user');

module.exports.index = function (req, res) {
	caseTypes.find({}, function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.available = function (req, res) {
	caseTypes.find({removed: 'false'}).exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function(req, res){
	var caseType = new caseTypes,
		caseTypesInfo = _.extend(caseType, req.body.caseTypeInfo);

	caseTypesInfo.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.softRemove = function(req, res){
	caseTypes.findById(req.params.id, function(err, caseType){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			caseType.removed = true;
			caseType.removeUser = req.user._id;
			if(caseType.remove && caseType.removeUser){
				caseType.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp(result);
					}
				});
			} else {
				res.status(500).jsonp({message: 'لم يتم توفير البيانات اللازمة'});
			}
		}
	});
}