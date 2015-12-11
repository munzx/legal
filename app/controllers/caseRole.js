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

module.exports.available = function (req, res) {
	caseRoles.find({removed: 'false'}, function(err, result){
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
			req.io.emit('caseRoles.role.add', result);
			req.io.emit('caseRoles.available.add', result);
		}
	});
}

module.exports.softRemove = function(req, res){
	caseRoles.findById(req.params.id, function(err, role){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			role.removed = true;
			role.removeUser = req.user._id;
			if(role.remove && role.removeUser){
				role.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp(result);
						req.io.emit('caseRoles.role.update', result);
						req.io.emit('caseRoles.available.update', result);
					}
				});
			} else {
				res.status(500).jsonp({message: 'لم يتم توفير البيانات اللازمة'});
			}
		}
	});
}