'use strict';

//Dependencies
var mongoose = require('mongoose'),
	calenders = require('../models/calendar'),
	users = require('../models/user'),
	_ = require('lodash'),
	moment = require('moment-range'),
	dateInput = require('../helpers/dateInput'),
	errorHandler = require('./error');


module.exports.index = function (req, res) {
	calenders.find({}).populate('user').populate('responsibility').sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
			req.feeds.reader(function (err, result) {
				if(err){
					console.log(err);
				}
			});
		}
	});
}

module.exports.pending = function (req, res) {
	calenders.find({'status': 'pending'}).populate('user').populate('responsibility').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.closed = function (req, res) {
	calenders.find({'status': 'close'}).populate('user').populate('responsibility').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function(req, res){
	var newCalender = new calenders,
		info = _.extend(newCalender, req.body.info);

	if((info.responsibility.toString() !== req.user._id.toString()) && (req.user.role !== 'admin')){
		res.status(500).jsonp('لايمكن إيكال مهام لموظف آخر');
	} else {
		info.user = req.user._id;
		newCalender.save(function(err, result){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				calenders.populate(result, [{path: 'user'}, {path: 'responsibility'}], function(err, info){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp(info);
						req.feeds.insert('tasks.add', req.user, info, function (err, result) {
							if(err){
								console.log(err);
							}
						}, true);
					}
				});
			}
		});
	}
}

module.exports.markDone = function(req, res){
	if(req.params.id && req.body.remarks){
		calenders.findById(req.params.id).populate('user').populate('responsibility').sort('-created').exec(function(err, result){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				if((result.responsibility._id.toString() == req.user._id.toString()) && (result.status == 'pending') && (result.rejected === false) && (result.status == 'pending')){
					result.status = 'close';
					result.remarks = req.body.remarks;
					result.save(function(err, done){
						if(err){
							res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
						} else {
							res.status(200).jsonp(done);
							//update reports
							req.feeds.insert('tasks.update', req.user, done, function (err, result) {
								if(err){
									console.log(err);
								}
							}, true, 'done');
						}
					});
				} else {
					res.status(403).jsonp('access denied');
				}
			}
		});
	} else {
		res.status(500).jsonp({message: 'id not provided'});
	}
}

module.exports.softRemove = function(req, res){
	if(req.params.id && req.body.remarks){
		calenders.findById(req.params.id).populate('user').populate('responsibility').sort('-created').exec(function(err, result){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				//if the remove request came from the task author
				if((result.user._id.toString() == req.user._id.toString()) && (result.status == 'pending') && (result.rejected === false) && (result.status == 'pending')){
					result.removed = true;
					result.remarks = req.body.remarks;
					result.save(function(err, done){
						if(err){
							res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
						} else {
							res.status(200).jsonp(done);
							//update reports
							req.feeds.insert('tasks.update', req.user, done, function (err, result) {
								if(err){
									console.log(err);
								}
							}, true, 'removed');
						}
					});
				} else {
					res.status(403).jsonp('access denied');
				}
			}
		});
	} else {
		res.status(500).jsonp({message: 'id not provided'});
	}
}

module.exports.rejectTask = function(req, res){
	if(req.params.id && req.body.remarks){
		calenders.findById(req.params.id).populate('user').populate('responsibility').sort('-created').exec(function(err, result){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				if((result.responsibility._id.toString() == req.user._id.toString()) && (result.status == 'pending') && (result.rejected === false) && (result.status == 'pending')){
					result.rejected = true;
					result.remarks = req.body.remarks;
					result.save(function(err, done){
						if(err){
							res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
						} else {
							res.status(200).jsonp(done);
							//update reports
							req.feeds.insert('tasks.update', req.user, done, function (err, result) {
								if(err){
									console.log(err);
								}
							}, true, 'rejected');
						}
					});
				} else {
					res.status(403).jsonp('access denied');
				}
			}
		});
	} else {
		res.status(500).jsonp({message: 'id not provided'});
	}
}