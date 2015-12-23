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

module.exports.available = function (req, res) {
	updateTypes.find({removed: 'false'}, function(err, result){
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
			req.feeds.send('updateType.update.add', result);
			req.feeds.send('updateType.availableUpdate.add', result);
		}
	});
}

module.exports.softRemove = function (req, res) {
	updateTypes.findById(req.params.id, function(err, updatetype){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			updatetype.removed = true;
			updatetype.removeUser = req.user._id;
			if(updatetype.removed && updatetype.removeUser){
				updatetype.save(function(err, updatetypeInfo){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp(updatetypeInfo);
						req.feeds.send('updateType.update.update', updatetypeInfo);
						req.feeds.send('updateType.availableUpdate.update', updatetypeInfo);
					}
				});
			} else {
				res.status(500).jsonp({message: 'لم يتم توفير البيانات اللازمة'});
			}
		}
	});
}