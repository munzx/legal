'use strict';

var mongoose = require('mongoose'),
	cases = require('../models/case'),
	errorHandler = require('./error'),
	court = require('../models/court'),
	_ = require('lodash'),
	moment = require('moment'),
	dateInput = require('../helpers/dateInput'),
	users = require('../models/user');


module.exports.index = function (req, res) {
	cases.find({}).sort('-created').populate('court').populate('client.user').populate('defendant.user').populate('updates.user').exec(function(err, result){
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
			cases.findById(result._id).sort('-created').populate('court').populate('client.user').populate('defendant.user').populate('updates.user').exec(function(err, result){
				if(err){
					res.status(500).jsonp({message: err});
				} else {
					res.status(200).jsonp(result);
				}
			});	
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
					res.status(200).jsonp('تم محو بيانات الدعوى بنجاح');
				}
			})
		}
	});
}

module.exports.insertCaseUpdate = function(req, res){
	if(req.params.id && req.body.update){
		cases.findById(req.params.id).populate('updates.user').exec(function(err, caseInfo){
			if(err){
				res.status(500).jsonp({message: err});
			} else if(caseInfo) {
				var updateInfo = {
						updateType: req.body.update.name,
						updateId: req.body.update.session.updateId,
						updateInfo: req.body.update.info,
						user: req.user._id
					}

				var updateSession = {
						newDate: req.body.update.session.newDate,
						newTime: req.body.update.session.newTime,
						updateId: req.body.update.session.updateId,
						user: req.user._id
					}

				var updateClientsInfo = req.body.update.clientInfo;
				var updateDefendantsInfo = req.body.update.defendantInfo;

				//empty the value so we dont get duplicated results
				caseInfo.client = [];
				caseInfo.defendant = [];

				updateClientsInfo.forEach(function(info){
					info.user = info.user._id;
					caseInfo.client.push(info)
				});

				updateDefendantsInfo.forEach(function(info){
					info.user = info.user._id;
					caseInfo.defendant.push(info);
				});

				caseInfo.sessions.push(updateSession);
				caseInfo.updates.push(updateInfo);

				caseInfo.save(function(error, updatedResult){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						cases.populate(updatedResult, [{path: 'updates.user'}, {path: 'client.user'}, {path: 'defendant.user'}], function(err, info){
							res.status(200).jsonp(info);
						});
					}
				});
			} else {
				res.status(500).jsonp({message: 'لم يتم العثور على الدعوى'});
			}
		});
	} else {
		res.status(500).jsonp({message: 'لم يتم توفير رقم المعرف'})
	}
}

module.exports.sessionDates = function(req, res){
	cases.find({}).where('sessions').exists().exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.upcomingSessions = function(req, res){
	cases.find({}).where('sessions').exists().populate('sessions').populate('defendant').populate('client').populate('sessions.user').sort('-newDate').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			var upcomingSessions = [],
				allCases = result,
				sessionInfo = {},
				session = {};

			allCases.forEach(function(caseInfo){
				if(caseInfo.sessions.length > 0){
					var sessions = caseInfo.sessions;
					sessions.forEach(function(info){
						if(moment(info.newDate).utc().format() >= moment().utc().format()){
							//get last session
							session = info;
							sessionInfo.caseId = caseInfo._id;
							sessionInfo.defendant = caseInfo.defendant;
							sessionInfo.client = caseInfo.client;
							sessionInfo.caseNumber = caseInfo.caseNumber;
							sessionInfo.sessionStatus = caseInfo.status;
							sessionInfo.sessionDate = session.newDate;
							sessionInfo.sessionTime = session.newTime;
							sessionInfo.sessionCreated = session.created;
							sessionInfo.sessionUpdateId = session.updateId;
							sessionInfo.sessionUser = session.user;
							//get last session info and case info
							upcomingSessions.push(sessionInfo);
							//cleart sessionInfo
							sessionInfo = {};		
						}
					});
				}
			});

			var sort = _.sortBy(upcomingSessions, 'sessionDate');
			res.status(200).jsonp(sort);
		}
	});
}

module.exports.previousSessions = function(req, res){
	cases.find({}).where('sessions').exists().populate('sessions').populate('defendant').populate('client').populate('sessions.user').sort('-newDate').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			var upcomingSessions = [],
				allCases = result,
				sessionInfo = {},
				session = {};

			allCases.forEach(function(caseInfo){
				if(caseInfo.sessions.length > 0){
					var sessions = caseInfo.sessions;
					sessions.forEach(function(info){
						if(moment(info.newDate).utc().format() <= moment().utc().format()){
							//get last session
							session = info;
							sessionInfo.caseId = caseInfo._id;
							sessionInfo.defendant = caseInfo.defendant;
							sessionInfo.client = caseInfo.client;
							sessionInfo.caseNumber = caseInfo.caseNumber;
							sessionInfo.sessionStatus = caseInfo.status;
							sessionInfo.sessionDate = session.newDate;
							sessionInfo.sessionTime = session.newTime;
							sessionInfo.sessionCreated = session.created;
							sessionInfo.sessionUpdateId = session.updateId;
							sessionInfo.sessionUser = session.user;
							//get last session info and case info
							upcomingSessions.push(sessionInfo);
							//cleart sessionInfo
							sessionInfo = {};		
						}
					});
				}
			});

			var sort = _.sortBy(upcomingSessions, 'sessionDate');
			res.status(200).jsonp(sort);
		}
	});
}