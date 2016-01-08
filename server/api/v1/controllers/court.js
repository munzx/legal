'use strict';

var mongoose = require('mongoose'),
	courts = require('../models/court'),
	users = require('../models/user'),
	errorHandler = require('./error'),
	_ = require('lodash');

module.exports.index = function (req, res) {
	courts.find({}, function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.available = function (req, res) {
	courts.find({removed: 'false'}).exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function(req, res){
	var court = new courts(),
		courtInfo = _.extend(court, req.body.courtInfo);

	court.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
			req.feeds.send('court.add', result);
			req.feeds.send('court.available.add', result);
		}
	});
}

module.exports.silentRemove = function(req, res){
	if(req.params.id){
		courts.findById(req.params.id, function(err, court){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				court.removed = 'true';
				court.removeUser = req.user._id;
				if(court.removed && court.removeUser){
					court.save(function (err, result) {
						if(err){
							res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
						} else {
							res.status(200).jsonp(result);
							req.feeds.send('court.update', result);
							req.feeds.send('court.available.update', result);
						}
					});
				} else {
					res.status(200).jsonp('لم يتم توفير البيانات اللازمة لحذف بيانات المحكمة');
				}
			}
		});
	} else {
		res.status(500).jsonp({message: 'يرجى إضافة معرف المحكمة بقاعدة البيانات'});
	}
}