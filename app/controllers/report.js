'use strict';

var fs = require('fs'),
mongoose = require('mongoose'),
async = require('async'),
cases = require('../models/case'),
errorHandler = require('./error'),
court = require('../models/court'),
_ = require('lodash'),
moment = require('moment-range'),
dateInput = require('../helpers/dateInput'),
users = require('../models/user'),
calenders = require('../models/calendar'),
defendants = require('../models/defendant');



module.exports.index = function (req, res) {
	async.waterfall([
		function(cb){
			var date = {
				from: '',
				to: ''
			}

			dateInput(req.params.dateFrom, req.params.dateTo, function (info) {
				date.from = info.from;
				date.to = info.to;
			}, 'months', 10);

			var dateInfo = {};
			var range = moment.range(date.from, date.to);
			range.by('months', function (moment) {
				if(!dateInfo[moment.year()]){
					dateInfo[moment.year()] = {};
					dateInfo[moment.year()][moment.month() + 1] = {'case': 0, 'memo': 0, 'session': 0, 'task': 0};
				} else {
					dateInfo[moment.year()][moment.month() + 1] = {'case': 0, 'memo': 0, 'session': 0, 'task': 0};
				}
			});
			cb(null, date, dateInfo);
		},
		function (dateInput, dateInfo, cb) {
			cases.find({"created": {"$gte": dateInput.from, "$lt": dateInput.to}}).populate('user').populate('updates.user').populate('updates.memoConsultant').populate('sessions.user').populate('sessions.lawyer').populate('court').populate('consultant').populate('memos.user').exec(function (err, allCases) {
				if(err){
					cb(err);
				} else {
					var info = {
						'caseCount': allCases.length,
						'openCaseCount': 0,
						'closedCaseCount': 0,
						'consultantCase': {},
						'courtCase': {},
						'sessions': {},
						'memos': {},
						'memosCount': 0
					}

					allCases.forEach(function (caseInfo) {

						//get the case info and record case date info
						if(dateInfo[moment(caseInfo.created).year()][moment(caseInfo.created).month() + 1]){
							dateInfo[moment(caseInfo.created).year()][moment(caseInfo.created).month() + 1].case++;
						}
						if(caseInfo.status === 'open'){
							info.openCaseCount++;
						} else {
							info.closedCaseCount++;
						}

						//consultant cases
						if(caseInfo.consultant.length){
							if(info.consultantCase[caseInfo.consultant[caseInfo.consultant.length - 1].name] ){
								info.consultantCase[caseInfo.consultant[caseInfo.consultant.length - 1].name]++;
								info.consultantCase[caseInfo.consultant[caseInfo.consultant.length - 1].name];
							} else {
								info.consultantCase[caseInfo.consultant[caseInfo.consultant.length - 1].name] = 1;
							}
						}

						//get the courts info
						if(info.courtCase[caseInfo.court[0].name]){
							info.courtCase[caseInfo.court[0].name]++;
						} else {
							info.courtCase[caseInfo.court[0].name] = 1;
						}

						//get the sessions info
						if(caseInfo.sessions.length > 0){
							caseInfo.sessions.forEach(function (sessionInfo) {
								if(dateInfo[moment(sessionInfo.created).year()][moment(sessionInfo.created).month() + 1]){
									dateInfo[moment(sessionInfo.created).year()][moment(sessionInfo.created).month() + 1].session++;
								}
								
								if(info.sessions[sessionInfo.lawyer[sessionInfo.lawyer.length - 1]){
									if(info.sessions[sessionInfo.lawyer[sessionInfo.lawyer.length - 1].name]){
										info.sessions[sessionInfo.lawyer[sessionInfo.lawyer.length - 1].name]++;
									} else {
										info.sessions[sessionInfo.lawyer[sessionInfo.lawyer.length - 1].name] = 1;
									}
								}
							});
						}

						//get the memos info
						if(caseInfo.updates.length > 0){
							caseInfo.updates.forEach(function (updateInfo) {
								if(updateInfo.memoRequired){
									info.memosCount++;
									if(dateInfo[moment(updateInfo.created).year()][moment(updateInfo.created).month() + 1]){
										dateInfo[moment(updateInfo.created).year()][moment(updateInfo.created).month() + 1].memo++;
									}
									if(updateInfo.memoConsultant.length){
										if(info.memos[updateInfo.memoConsultant[updateInfo.memoConsultant.length - 1].name]){
											info.memos[updateInfo.memoConsultant[updateInfo.memoConsultant.length - 1].name]++;
										} else {
											info.memos[updateInfo.memoConsultant[updateInfo.memoConsultant.length - 1].name] = 1;
										}
									}
								}
							});
						}
					});
					cb(null, dateInput, dateInfo, info);
				}
			});	
		},
		function (dateInput, dateInfo, caseInfo, cb) {
			calenders.find({"created": {"$gte": dateInput.from, "$lt": dateInput.to}}).populate('user').exec(function (err, result) {
				if(err){
					cb(err);
				} else {
					var calenderInfo = {
						'taskClosed': {'total': 0, 'user': {}},
						'taskPendding': {'total': 0, 'user': {}},
						'taskRejected': {'total': 0, 'user': {}}
					}

					result.forEach(function (taskInfo) {
						if(dateInfo[moment(taskInfo.created).year()][moment(taskInfo.created).month() + 1]){
							dateInfo[moment(taskInfo.created).year()][moment(taskInfo.created).month() + 1].task++;
						}
						if(taskInfo.rejected){
							calenderInfo.taskRejected.total++;
							if(calenderInfo.taskRejected.user[taskInfo.user.name]){
								calenderInfo.taskRejected.user[taskInfo.user.name]++;
							} else {
								calenderInfo.taskRejected.user[taskInfo.user.name] = 1;
							}
						} else {
							if(taskInfo.status == 'pending'){
								calenderInfo.taskPendding.total++;
								if(calenderInfo.taskPendding.user[taskInfo.user.name]){
									calenderInfo.taskPendding.user[taskInfo.user.name]++;
								} else {
									calenderInfo.taskPendding.user[taskInfo.user.name] = 1;
								}
							} else {
								calenderInfo.taskClosed.total++;
								if(calenderInfo.taskClosed.user[taskInfo.user.name]){
									calenderInfo.taskClosed.user[taskInfo.user.name]++;
								} else {
									calenderInfo.taskClosed.user[taskInfo.user.name] = 1;
								}
							}
						}
					});
					cb(null, dateInput, dateInfo, caseInfo, calenderInfo);
				}
			});	
		}
	], function (err, dateInput, dateInfo, caseInfo, calenderInfo) {
		if(err){
			res.status(500).jsonp(err);
		} else {
			var info = _.merge(caseInfo, calenderInfo);
			res.status(200).jsonp({'info': info , 'dateInfo': dateInfo, 'dateInput': dateInput});
		}
	});
}