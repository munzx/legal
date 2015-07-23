'use strict';

var mongoose = require('mongoose'),
	caseRoles = require('../models/caseRole'),
	errorHandler = require('./error'),
	_ = require('lodash'),
	users = require('../models/user');

module.exports.index = function (req, res) {
	caseRoles.find({}, function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function(req, res){
	var caseRole = new caseRoles,
		caseRoleInfo = _.extend(caseRole, req.body.caseRoleInfo);

	caseRoleInfo.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.remove = function(req, res){
	caseRoles.findById(req.params.id, function(err, role){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			role.remove(function(err, result){
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else {
					res.status(200).jsonp('تم حذف الصفة بنجاح');
				}
			});
		}
	});
}