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
	async.parallel([
		function (cb) {
			cases.find({}).populate('user').populate('updates.user').populate('updates.memoConsultant').populate('sessions.user').populate('court').populate('consultant').populate('memos.user').exec(function (err, allCases) {
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
						//get the case info
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
								if(info.sessions[sessionInfo.user.name]){
									info.sessions[sessionInfo.user.name]++;
								} else {
									info.sessions[sessionInfo.user.name] = 1;
								}
							});
						}

						//get the memos info
						if(caseInfo.updates.length > 0){
							caseInfo.updates.forEach(function (updateInfo) {
								if(updateInfo.memoRequired){
									info.memosCount++;
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
					cb(null, info);
				}
			});	
		},
		function (cb) {
			calenders.find({}).populate('user').exec(function (err, result) {
				if(err){
					cb(err);
				} else {
					var info = {
						'taskClosed': {'total': 0, 'user': {}},
						'taskPendding': {'total': 0, 'user': {}},
						'taskRejected': {'total': 0, 'user': {}}
					}

					result.forEach(function (taskInfo) {
						if(taskInfo.rejected){
							info.taskRejected.total++;
							if(info.taskRejected.user[taskInfo.user.name]){
								info.taskRejected.user[taskInfo.user.name]++;
							} else {
								info.taskRejected.user[taskInfo.user.name] = 1;
							}
						} else {
							if(taskInfo.status == 'pending'){
								info.taskPendding.total++;
								if(info.taskPendding.user[taskInfo.user.name]){
									info.taskPendding.user[taskInfo.user.name]++;
								} else {
									info.taskPendding.user[taskInfo.user.name] = 1;
								}
							} else {
								info.taskClosed.total++;
								if(info.taskClosed.user[taskInfo.user.name]){
									info.taskClosed.user[taskInfo.user.name]++;
								} else {
									info.taskClosed.user[taskInfo.user.name] = 1;
								}
							}
						}
					});
					cb(null, info);
				}
			});	
		}
	], function (err, result) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			var info = _.merge(result[0], result[1]);
			res.status(200).jsonp({'info': info});
		}
	});
}