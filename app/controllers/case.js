'use strict';

var mongoose = require('mongoose'),
	cases = require('../models/case'),
	errorHandler = require('./error'),
	court = require('../models/court'),
	_ = require('lodash'),
	users = require('../models/user');


module.exports.index = function (req, res) {
	cases.find({}).populate('court').populate('client').populate('defendant').populate('updates.user').exec(function(err, result){
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

module.exports.insertCaseUpdate = function(req, res){
	if(req.params.id){
		cases.findById(req.params.id).populate('updates.user').exec(function(err, caseInfo){
			if(err){
				res.status(500).jsonp({message: err});
			} else if(caseInfo) {
				var updateInfo = {
						updateType: req.body.update.name,
						updateInfo: req.body.update.info,
						user: req.user._id
					};

				caseInfo.updates.push(updateInfo);
				caseInfo.save(function(error, updatedResult){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						cases.populate(updatedResult, {path: 'updates.user'}, function(err, info){
							res.status(200).jsonp(info);
						});
					}
				});
			} else {
				res.status(500).jsonp({message: 'لم يتم العثور على القضية'});
			}
		});
	} else {
		res.status(500).jsonp({message: 'لم يتم توفير رقم المعرف'})
	}
}