'use strict';

var mongoose = require('mongoose'),
	updateTypes = require('../models/updateType'),
	errorHandler = require('./error'),
	users = require('../models/user'),
	_ = require('lodash');

module.exports.index = function (req, res) {
	updateTypes.find({}, function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function (req, res) {
	var updatetype = new updateTypes,
		updatetypesInfo = _.extend(updatetype, req.body.updatetypesInfo);

	updatetypesInfo.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.remove = function (req, res) {
	updateTypes.findById(req.params.id, function(err, updatetype){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			updatetype.remove(function(){
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else {
					res.status(200).jsonp('تم محو نوع التحديث بنجاح');
				}
			});
		}
	});
}