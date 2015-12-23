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

module.exports.available = function (req, res) {
	defendants.find({removed: 'false'}).sort('-created').exec(function(err, result){
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
			req.feeds.send('defendant.add', result);
			req.feeds.send('defendant.available.add', result);
		}
	});
}

module.exports.softRemove = function(req, res){
	defendants.findById(req.params.id, function(err, defendant){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			defendant.removed = true;
			defendant.removeUser = req.user._id;
			if(defendant.removed && defendant.removeUser){
				defendant.save(function(error, info){
					if(error){
						res.status(500).jsonp({message: error});
					} else {
						res.status(200).jsonp(info);
						req.feeds.send('defendant.update', info);
						req.feeds.send('defendant.available.update', info);
					}
				});
			} else {
				res.status(500).jsonp({message: 'لم يتم توفير البيانات اللازمة'});
			}
		}
	});
}

module.exports.search = function(req, res){
	if(req.params.phrase){
		var re = new RegExp(req.params.phrase, "i");
		defendants.find().or([ {'firstName': {$regex: re}}, {'lastName': {$regex: re}}, {'mobilePhone': {$regex: re}}, {'address': {$regex: re}} ]).exec(function(err, result){
			if(err){
				res.status(500).jsonp(err);
			} else {
				res.status(200).jsonp(result);
			}
		});
	} else {
		res.status(500).jsonp('search phrase not provided');
	}
}