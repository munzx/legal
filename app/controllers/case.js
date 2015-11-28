'use strict';

var fs = require('fs'),
mongoose = require('mongoose'),
cases = require('../models/case'),
errorHandler = require('./error'),
court = require('../models/court'),
_ = require('lodash'),
moment = require('moment-range'),
dateInput = require('../helpers/dateInput'),
users = require('../models/user'),
defendants = require('../models/defendant');


module.exports.index = function (req, res) {
	cases.find({}).sort('-created').populate('court').populate('consultant').populate('client.user').populate('defendant.user').populate('updates.user').exec(function(err, result){
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
				var isValid = true;
				var updateInfo = {
					updateType: req.body.update.name,
					updateId: req.body.update.session.updateId,
					updateInfo: req.body.update.info,
					memoRequired: req.body.update.memoRequired,
					user: req.user._id
				}

				//if the memo is required then make sure "memoRequiredDate" is defined
				if(updateInfo.memoRequired){
					updateInfo.memoId = req.body.update.memoId || caseInfo.caseNumber;
					updateInfo.memoType = req.body.update.memoType || caseInfo.caseType;
					updateInfo.memoRequiredDate = req.body.update.memoRequiredDate;

					if(!updateInfo.memoRequiredDate || !updateInfo.memoId || !updateInfo.memoType){
						isValid = false;
					}
				}

				var updateSession = {
					newDate: req.body.update.session.newDate || false,
					newTime: req.body.update.session.newTime || false,
					refType: req.body.update.session.refType || caseInfo.caseType,
					refNumber: req.body.update.session.refNumber || caseInfo.caseNumber,
					user: req.user._id || false
				}

				if(updateInfo.sessionRequired){
					//Check if "new session info" are there , if so then insert new session info
					if(updateSession.newDate && updateSession.newTime && updateSession.user){
						caseInfo.sessions.push(updateSession);
					}
				}

				var updateClientsInfo = req.body.update.clientInfo || [];
				var updateDefendantsInfo = req.body.update.defendantInfo || [];

				if(updateClientsInfo.length > 0 && updateDefendantsInfo.length > 0){
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
				}

				if(isValid){
					caseInfo.updates.push(updateInfo);

					caseInfo.save(function(error, updatedResult){
						if(error){
							res.status(500).jsonp(error);
						} else if(updatedResult) {
							cases.populate(updatedResult, [{path: 'updates.user'}, {path: 'client.user'}, {path: 'defendant.user'}], function(err, caseAllInfo){
								if(err){
									res.status(500).jsonp(err);
								} else {
									res.status(200).jsonp(caseAllInfo);
								}
							});
						} else {
							res.status(500).jsonp({message: 'لم يتم تسجيل البيانات'});		
						}
					});
				} else {
					res.status(500).jsonp({message: 'لم يتم توفير البانات الازمة'});
				}
			} else {
				res.status(500).jsonp({message: 'لم يتم العثور على الدعوى'});
			}
		});
	} else {
		res.status(500).jsonp({message: 'لم يتم توفير رقم المعرف'});
	}
}

module.exports.silentRemoveCaseUpdate = function (req, res) {
	if(req.params.id && req.params.updateId){
		cases.findById(req.params.id).exec(function (err, result) {
			if(err){
				res.status(500).jsonp({message: err});
			} else {
				var updateInfo = result.updates.id(req.params.updateId);
				if(updateInfo){
					if(updateInfo.removed){
						res.status(500).jsonp({message: 'التحديث محذوف مسبقا'});
					} else {
						updateInfo.removed = true;
						updateInfo.removeUser = req.user._id;
						result.save(function (err, info) {
							if(err){
								res.status(500).jsonp({message: err});
							} else {
								res.status(200).jsonp(info);
							}
						});
					}
				} else {
					res.status(500).jsonp({message: 'لم يتم العثور على التحديث المطلوب'});
				}
				
			}
		});
	} else {
		res.status(500).jsonp({message: 'لم يتم توفير رقم التحديث'});
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
	cases.find({}).where('sessions').exists().populate('sessions').populate('defendant.user').populate('court').populate('client.user').populate('sessions.user').populate('sessions.lawyer').sort('-newDate').exec(function(err, result){
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
						if(moment(info.newDate).format() >= moment().format()){
							//get last session
							session = info;
							sessionInfo.court = caseInfo.court;
							sessionInfo.caseId = caseInfo._id;
							sessionInfo.defendant = caseInfo.defendant;
							sessionInfo.client = caseInfo.client;
							sessionInfo.refNumber = session.refNumber;
							sessionInfo.refType = session.refType;
							sessionInfo.lawyer = session.lawyer;
							sessionInfo.sessionStatus = caseInfo.status;
							sessionInfo.sessionDate = session.newDate;
							sessionInfo.sessionTime = session.newTime;
							sessionInfo.sessionCreated = session.created;
							sessionInfo.sessionUpdateId = session.updateId;
							sessionInfo.sessionUser = session.user;
							//get last session info and case info
							upcomingSessions.push(sessionInfo);
							//clear sessionInfo
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
	cases.find({}).where('sessions').exists().populate('sessions').populate('defendant.user').populate('client.user').populate('court').populate('sessions.user').populate('sessions.lawyer').sort('-newDate').exec(function(err, result){
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
						if(moment(info.newDate).format() <= moment().format()){
							//get last session
							session = info;
							sessionInfo.court = caseInfo.court;
							sessionInfo.caseId = caseInfo._id;
							sessionInfo.defendant = caseInfo.defendant;
							sessionInfo.client = caseInfo.client;
							sessionInfo.refNumber = session.refNumber;
							sessionInfo.refType = session.refType;
							sessionInfo.sessionStatus = caseInfo.status;
							sessionInfo.sessionDate = session.newDate;
							sessionInfo.sessionTime = session.newTime;
							sessionInfo.sessionCreated = session.created;
							sessionInfo.sessionUpdateId = session.updateId;
							sessionInfo.sessionUser = session.user;
							//get last session info and case info
							upcomingSessions.push(sessionInfo);
							//clear sessionInfo
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

module.exports.byDate = function(req, res){
	var dataDates;
	var userDateInput = dateInput(req.body.info.dateFrom, req.body.info.dateTo, function (result) {
		dataDates = result;
	});

	cases.find({"sessions.newDate": {"$gte": dataDates.from, "$lt": dataDates.to}}).populate('sessions.lawyer').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			if(req.body.info.lawyerID && req.body.info.courtID && req.body.info.dateFrom && req.body.info.dateTo){
				var allCases = result,
				range = moment().range(moment(dataDates.from).subtract(1, 'day'), moment(dataDates.to).add(1, 'day'));

				allCases.forEach(function(caseInfo){
					var sessionInfo = caseInfo.sessions;
					sessionInfo.forEach(function(info){
						var infoNewDate = moment(info.newDate);
						if(range.contains(infoNewDate)){
							info.lawyer.push(req.body.info.lawyerID);
							caseInfo.save(function(err){
								if(err){
									console.log(err);
								}
							});
						}
					});
				});
				res.status(200).jsonp({message:'تم تحديث المهام بنجاح'});
			} else {
				res.status(500).jsonp({message: 'يرجى التأكد من إدخال جميع البيانات المطلوبة'});
			}
		}
	});
}

module.exports.byCase = function(req, res){
	cases.findById(req.body.info.caseID).populate('sessions.lawyer').exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: errorHandler(err)})
		} else {
			if(req.body.info){
				var getCaseInfo = caseInfo.sessions;
				getCaseInfo.forEach(function(info){
					info.lawyer.push(req.body.info.lawyerID)
				});

				caseInfo.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						res.status(200).jsonp({message:'تم تحديث المهام بنجاح'});
					}
				});
			} else {
				res.status(500).jsonp({message: 'يرجى التأكد من إدخال جميع البيانات المطلوبة'});
			}
		}
	});
}

module.exports.memosPending = function(req, res){
	cases.find({"updates.memoRequired": true}).populate('court').populate('client.user').populate('defendant.user').populate('updates.user').populate('updates.memoConsultant').sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			var upcomingupdates = [],
			allCases = result,
			updateInfo = {},
			update = {};

			allCases.forEach(function(caseInfo){
				if(caseInfo.updates.length > 0){
					var updates = caseInfo.updates;
					updates.forEach(function(info){
						//get last update
						update = info;
						if(update.memoRequired && update.memoStatus == 'pending'){
							updateInfo.court = caseInfo.court;
							updateInfo.caseId = caseInfo._id;
							updateInfo.defendant = caseInfo.defendant;
							updateInfo.client = caseInfo.client;
							updateInfo.memoId = update.memoId;
							updateInfo.memoType = update.memoType;
							updateInfo.memoConsultant = update.memoConsultant;
							updateInfo.memoRequired = update.memoRequired;
							updateInfo.memoRequiredDate = update.memoRequiredDate;
							updateInfo.memoStatus = update.memoStatus;
							updateInfo.updateDate = update.newDate;
							updateInfo.updateTime = update.newTime;
							updateInfo.updateCreated = update.created;
							updateInfo.updateId = update._id;
							updateInfo.updateUser = update.user;
							//get last update info and case info
							upcomingupdates.push(updateInfo);
							//clear updateInfo
							updateInfo = {};
						}			
					});
				}
			});

			var sort = _.sortBy(upcomingupdates, 'sessionDate');
			res.status(200).jsonp(sort);
		}
	});
}

module.exports.memosClosed = function(req, res){
	cases.find({"updates.memoRequired": true}).populate('court').populate('client.user').populate('defendant.user').populate('updates.user').populate('updates.memoConsultant').sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			var upcomingupdates = [],
			allCases = result,
			updateInfo = {},
			update = {};

			allCases.forEach(function(caseInfo){
				if(caseInfo.updates.length > 0){
					var updates = caseInfo.updates;
					updates.forEach(function(info){
						//get last update
						update = info;
						if(update.memoRequired && update.memoStatus == 'closed'){
							updateInfo.court = caseInfo.court;
							updateInfo.caseId = caseInfo._id;
							updateInfo.defendant = caseInfo.defendant;
							updateInfo.client = caseInfo.client;
							updateInfo.memoId = update.memoId;
							updateInfo.memoType = update.memoType;
							updateInfo.memoConsultant = update.memoConsultant;
							updateInfo.memoRequired = update.memoRequired;
							updateInfo.memoRequiredDate = update.memoRequiredDate;
							updateInfo.memoStatus = update.memoStatus;
							updateInfo.updateDate = update.newDate;
							updateInfo.updateTime = update.newTime;
							updateInfo.updateCreated = update.created;
							updateInfo.updateId = update._id;
							updateInfo.updateUser = update.user;
							//get last update info and case info
							upcomingupdates.push(updateInfo);
							//clear updateInfo
							updateInfo = {};
						}			
					});
				}
			});

var sort = _.sortBy(upcomingupdates, 'sessionDate');
res.status(200).jsonp(sort);
}
});
}

module.exports.consultantMemos = function(req, res){
	cases.find({"updates.memoRequired": true}).populate('court').populate('client.user').populate('defendant.user').populate('updates.user').populate('updates.memoConsultant').sort('-created').exec(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			var allUpdates = [],
			allCases = result,
			updateInfo = {},
			update = {};

			allCases.forEach(function(caseInfo){
				if(caseInfo.updates.length > 0){
					var updates = caseInfo.updates;
					updates.forEach(function(info){
						//get last update
						update = info;
						if(update.memoRequired && req.user){
							//get all memos linked to a certain consultant
							if(update.memoConsultant[0]._id.toString() == req.params.id.toString()){
								updateInfo.court = caseInfo.court;
								updateInfo.caseId = caseInfo._id;
								updateInfo.defendant = caseInfo.defendant;
								updateInfo.client = caseInfo.client;
								updateInfo.caseNumber = caseInfo.caseNumber;
								updateInfo.memoConsultant = update.memoConsultant;
								updateInfo.memoRequired = update.memoRequired;
								updateInfo.memoRequiredDate = update.memoRequiredDate;
								updateInfo.memoStatus = update.memoStatus;
								updateInfo.updateDate = update.newDate;
								updateInfo.updateTime = update.newTime;
								updateInfo.updateCreated = update.created;
								updateInfo.updateId = update._id;
								updateInfo.updateUser = update.user;
								//get last update info and case info
								allUpdates.push(updateInfo);
								//clear updateInfo
								updateInfo = {};
							}
						}			
					});
				}
			});

			var sort = _.sortBy(allUpdates, 'sessionDate');
			res.status(200).jsonp(sort);
		}
	});
}

module.exports.insertMemoConsultant = function(req, res){
	cases.findById(req.body.update.caseId).populate('updates.user').exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			var memoUpdateInfo = caseInfo.updates.id(req.body.update.memoId);
			if(memoUpdateInfo){
				memoUpdateInfo.memoConsultant.push(req.body.update.memoConsultantId);
				caseInfo.save(function(err, info){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						res.status(200).jsonp(info);
					}
				});
			} else {
				res.status(500).jsonp({message: err});
			}
		}
	});
}

//insert already created client to a case
module.exports.insertClient = function(req, res){
	cases.findById(req.body.caseId).populate('updates.user').exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else if(caseInfo) {
			var clientInfo = {
				user: req.body.userInfo.userId,
				role: req.body.userInfo.role,
				added: true
			}

			var find = _.find(caseInfo.client, function(info){
				return clientInfo.user.toString() == info.user.toString();
			});

			if(find != undefined){
				res.status(500).jsonp({message: 'client already exists'});
			} else {
				caseInfo.client.push(clientInfo);
				caseInfo.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						//add an update
						caseInfo.updates.push({
							updateType: 'إضافة موكل',
							updateInfo: 'إضافة موكل إلى القضية',
							refId: result.client[result.client.length - 1]._id,
							user: req.user._id
						});

						caseInfo.save(function(err, result){
							if(err){
								res.status(500).jsonp({message: err});
							} else {
								cases.populate(result, [{path: 'client.user'}, {path: 'updates.user'}], function(err, userInfo){
									//get the last client , the one just been inserted
									//get the last update as well
									var info = {
										'update': userInfo.updates[userInfo.updates.length - 1],
										'client': userInfo.client[userInfo.client.length - 1]
									}
									res.status(200).jsonp(info);
								});
							}
						});
					}
				});
			}
		} else {
			res.status(500).jsonp({message: 'Case not found'});
		}
	});
}

//create a new client and insert its information to an existing case
module.exports.insertNewClient = function(req, res){
	cases.findById(req.body.caseId).populate('updates.user').exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else if(caseInfo) {
			//create new client
			var client = new users,
			newClient = _.extend(client, req.body.userInfo);

			client.save(function(err, result){
				if(err){
					res.status(500).jsonp({message: err});
				} else {
					var clientInfo = {
						user: result._id,
						role: req.body.userInfo.clientRole,
						added: true
					}

					caseInfo.client.push(clientInfo);
					caseInfo.save(function(err, result){
						if(err){
							res.status(500).jsonp({message: err});
						} else {
							//add an update
							caseInfo.updates.push({
								updateType: 'إضافة موكل',
								updateInfo: 'إضافة موكل إلى القضية',
								refId: result.client[result.client.length - 1]._id,
								user: req.user._id
							});

							caseInfo.save(function(err, result){
								if(err){
									res.status(500).jsonp({message: err});
								} else {
									cases.populate(result, [{path: 'client.user'}, {path: 'updates.user'}], function(err, userInfo){
										//get the last client , the one just been inserted
										//get the last update as well
										var info = {
											'update': userInfo.updates[userInfo.updates.length - 1],
											'client': userInfo.client[userInfo.client.length - 1]
										}
										res.status(200).jsonp(info);
									});
								}
							});
						}
					});
				}
			});
		} else {
			res.status(500).jsonp({message: 'Case not found'});
		}
	});
}


//insert already created defendant to a case
module.exports.insertDefendant = function(req, res){
	cases.findById(req.body.caseId).populate('updates.user').exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else if(caseInfo) {
			var defendantInfo = {
				user: req.body.userInfo.userId,
				role: req.body.userInfo.role,
				added: true
			}

			var find = _.find(caseInfo.defendant, function(info){
				return defendantInfo.user.toString() == info.user.toString();
			});

			if(find != undefined){
				res.status(500).jsonp({message: 'defendant already exists'});
			} else {
				caseInfo.defendant.push(defendantInfo);
				caseInfo.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						//add an update
						caseInfo.updates.push({
							updateType: 'إضافة خصم',
							updateInfo: 'إضافة خصم إلى القضية',
							refId: result.defendant[result.defendant.length - 1]._id,
							user: req.user._id
						});

						caseInfo.save(function(err, result){
							if(err){
								res.status(500).jsonp({message: err});
							} else {
								cases.populate(result, [{path: 'defendant.user'}, {path: 'updates.user'}], function(err, userInfo){
									//get the last defendant , the one just been inserted
									//get the last update as well
									var info = {
										'update': userInfo.updates[userInfo.updates.length - 1],
										'defendant': userInfo.defendant[userInfo.defendant.length - 1]
									}
									res.status(200).jsonp(info);
								});
							}
						});
					}
				});
			}
		} else {
			res.status(500).jsonp({message: 'Case not found'});
		}
	});
}

//create a new defendant and insert its information to an existing case
module.exports.insertNewDefendant = function(req, res){
	cases.findById(req.body.caseId).populate('updates.user').exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else if(caseInfo) {
			//create new defendant
			var defendant = new defendants,
			newdefendant = _.extend(defendant, req.body.userInfo);

			defendant.save(function(err, result){
				if(err){
					res.status(500).jsonp({message: err});
				} else {
					var defendantInfo = {
						user: result._id,
						role: req.body.userInfo.defendantRole,
						added: true
					}

					caseInfo.defendant.push(defendantInfo);
					caseInfo.save(function(err, result){
						if(err){
							res.status(500).jsonp({message: err});
						} else {
							//add an update
							caseInfo.updates.push({
								updateType: 'إضافة خصم',
								updateInfo: 'إضافة خصم إلى القضية',
								refId: result.defendant[result.defendant.length - 1]._id,
								user: req.user._id
							});

							caseInfo.save(function(err, result){
								if(err){
									res.status(500).jsonp({message: err});
								} else {
									cases.populate(result, [{path: 'defendant.user'}, {path: 'updates.user'}], function(err, userInfo){
										//get the last defendant , the one just been inserted
										//get the last update as well
										var info = {
											'update': userInfo.updates[userInfo.updates.length - 1],
											'defendant': userInfo.defendant[userInfo.defendant.length - 1]
										}
										res.status(200).jsonp(info);
									});
								}
							});
						}
					});
				}
			});
		} else {
			res.status(500).jsonp({message: 'Case not found'});
		}
	});
}


module.exports.clientSilentRemove = function(req, res){
	cases.findById(req.params.caseId).exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else if(caseInfo) {
			var clientInfo = caseInfo.client.id(req.params.clientId),
			getUpdateIndex = _.findIndex(caseInfo.updates, function(info){
				return clientInfo._id.equals(info.refId);
			});

			if(clientInfo.removed == false){
				clientInfo.removed = true;
				clientInfo.removeUser = req.user._id;

				//make the update "which is linked by refId to this client in this case" marked removed
				//only if the update found
				if(getUpdateIndex !== -1){
					caseInfo.updates[getUpdateIndex].removed = true;
					caseInfo.updates[getUpdateIndex].removeUser = req.user._id;
				}

				caseInfo.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						res.status(200).jsonp(result);
					}
				});
			} else {
				res.status(500).jsonp({message: 'Already deleted'});
			}
		} else {
			res.status(500).jsonp({message: 'case not found'});
		}
	});
}

module.exports.defendantSilentRemove = function(req, res){
	cases.findById(req.params.caseId).exec(function(err, caseInfo){
		if(err){
			res.status(500).jsonp({message: err});
		} else if(caseInfo) {
			var defendantInfo = caseInfo.defendant.id(req.params.defendantId),
			getUpdateIndex = _.findIndex(caseInfo.updates, function(info){
				return defendantInfo._id.equals(info.refId);
			});

			if(defendantInfo.removed == false){
				defendantInfo.removed = true;
				defendantInfo.removeUser = req.user._id;

				//make the update "which is linked by refId to this client in this case" marked removed
				//only if the update found
				if(getUpdateIndex !== -1){
					caseInfo.updates[getUpdateIndex].removed = true;
					caseInfo.updates[getUpdateIndex].removeUser = req.user._id;
				}

				caseInfo.save(function(err, result){
					if(err){
						res.status(500).jsonp({message: err});
					} else {
						res.status(200).jsonp(result);
					}
				});
			} else {
				res.status(500).jsonp({message: 'Already deleted'});
			}
		} else {
			res.status(500).jsonp({message: 'case not found'});
		}
	});
}


module.exports.search = function(req, res){	
	//to avoid "not defined" error in case of the user has passed empty object
	var search = req.body.search = req.body.search || {};
	var searchPhrase = search.phrase || '';
	var re = new RegExp(searchPhrase, "i");
	var dataDates = {};

	//create the dates using the recieved dates info
	dataDates.from = moment(new Date(search.dateFrom));
	dataDates.to = moment(new Date(search.dateTo));

	//check if the dates are valid
	//if not then assign new values that ranges between 20 past years and 20 coming years
	dataDates.from = (dataDates.from.isValid())? dataDates.from.format(): moment().subtract(20, 'year').format();
	dataDates.to = (dataDates.to.isValid())? dataDates.to.format(): moment().add(20, 'year').format();

	cases.find().where({"caseDate": {"$gte": dataDates.from, "$lte": dataDates.to}}).and([{ $or:[{'caseNumber': {$regex: re}}, {'reportNumber': {$regex: re}}, {'subject': {$regex: re}}] }]).exec(function(err, result){
		if(err){
			res.status(500).jsonp(err);
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.docs = function(req, res){
	if(req.params.caseID){
		cases.findById(req.params.caseID).populate('docs.user').exec(function(err, result){
			if(err){
				res.status(500).jsonp({message: err});
			} else {
				res.status(200).jsonp(result.docs);
			}
		});
	} else {
		res.status(500).jsonp({message: 'Case id is required'});
	}
}

module.exports.uploadDoc = function(req, res){
	if(req.file){
		if(req.params.caseID){
			cases.findById(req.params.caseID, function(err, caseInfo){
				if(err){
					fs.unlink(req.file.path);
					res.status(500).jsonp({message: err});
				} else {
					var info = {
						'description': req.body.description,
						'name': req.body.name,
						'path': req.file.path,
						'user': req.user._id
					}

					caseInfo.docs.push(info);
					caseInfo.save(function(err, result){
						if(err){
							fs.unlink(req.file.path);
							res.status(500).jsonp({message: err});
						} else {
							res.status(200).jsonp(result.docs[result.docs.length -1]);
						}
					});
				}
			});
		} else {
			fs.unlink(req.file.path);
			res.status(500).jsonp('No file has been uploaded');
		}
	} else {
		res.status(500).jsonp('No file has been uploaded');
	}
}

module.exports.downloadDoc = function(req, res){
	if(req.params.caseID && req.params.docID){
		cases.findById(req.params.caseID, function(err, result){
			if(err){
				res.status(500).jsonp({message: err});
			} else {
				var doc = result.docs.id(req.params.docID);
				res.status(200).download(doc.path);
			}
		});
	} else {
		res.status(500).jsonp({message: 'Case id and Document id are required'});
	}
}

module.exports.removeDoc = function(req, res){
	if(req.params.caseID && req.params.docID){
		cases.findById(req.params.caseID, function(err, result){
			if(err){
				res.status(500).jsonp({message: err});
			} else {
				var doc = result.docs.id(req.params.docID);
				if(doc){
					fs.unlink(doc.path);
					doc.remove();
					result.save(function(err, result){
						if(err){
							res.status(500).jsonp({message: err});
						} else {
							res.status(200).jsonp(result);
						}
					});
				} else {
					res.status(500).jsonp({message: 'Document not found'});
				}
			}
		});
	} else {
		res.status(500).jsonp({message: 'Case id and doc id are required'});
	}
}

module.exports.updates = function (req, res) {
	if(req.params.id){
		cases.findById(req.params.id).exec(function (err, result) {
			if(err){
				res.status(500).jsonp({message: err});
			} else {
				var info = result.updates,
					serve = [];

				info.forEach(function (item) {
					if(item.updateId){
						serve.push(item);
					}
				});
				res.status(200).jsonp(serve);
			}
		});
	} else {
		res.status(500).jsonp({message: 'Case id is required'});
	}
}