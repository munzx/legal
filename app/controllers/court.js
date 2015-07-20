'use strict';

var mongoose = require('mongoose'),
	courts = require('../models/court'),
	users = require('../models/user'),
	errorHandler = require('./error'),
	_ = require('lodash');

module.exports.index = function (req, res) {
	courts.find({}, function(err, result){
		if(err){
			console.log(err);
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
		}
	});
}

module.exports.remove = function(req, res){
	if(req.params.id){
		courts.findById(req.params.id, function(err, court){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				court.remove(function(err){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp('تم مسح بيانات المحكمة')
					}
				});
			}
		});
	} else {
		res.status(500).jsonp({message: 'يرجى إضافة معرف المحكمة بقاعدة البيانات'});
	}
}