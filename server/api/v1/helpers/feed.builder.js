'use strict';

var feeds = require('../models/feed'),
_ = require('lodash'),
users = require('../models/user'),
courts = require('../models/court'),
moment = require('moment-range');


function init (req, res, next, io) {

	var actionType = function (action) {
		var action = (action)? action.toString(): '';
		switch(action){
			case "done":
			action = 'marked done';
			break;
			case "removed":
			action = 'removed';
			break;
			case "rejected":
			action = "rejected";
			break;
			default:
			action = "updated";
		}
		return action;
	}

	var feedTemplate = function (user, info) {
		return {
			'name': info.name,
			'group': info.group,
			'action': info.action,
			'taskRef': info.taskRef,
			'caseRef': info.caseRef,
			'userRef': info.userRef,
			'defendantRef': info.defendantRef,
			'subRef': info.subRef,
			'reader': user,
			'user': user
		}
	}

	//read: excepts 'feed' info from the 'feeds' collection 'database'
	var timeLineBuilder = {
		'tasks.add': {
			prepare: function  (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'tasks',
					'name': 'tasks.add',
					'action': 'add',
					'taskRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					return req.i18n.__('tasks.add', feed.taskRef.user.name, feed.taskRef.task);//' has added a new task '
				} else {
					return false;
				}
			}
		},
		'tasks.update': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'tasks',
					'name': 'tasks.update',
					'action': action,
					'taskRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					switch(feed.action){
						case "removed":
							return req.i18n.__('tasks.update.removed', feed.taskRef.user.name, feed.taskRef.task);
							break;
						case "done":
							return req.i18n.__('tasks.update.done', feed.taskRef.user.name, feed.taskRef.task);
							break;
						case "rejected":
							return req.i18n.__('tasks.update.rejected', feed.taskRef.user.name, feed.taskRef.task);
							break;
						default:
							return req.i18n.__('tasks.update.updated', feed.taskRef.user.name, feed.taskRef.task);
					}
				} else {
					return false;
				}
			}
		},
		'cases.add': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'cases',
					'name': 'cases.add',
					'action': 'add',
					'caseRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					return req.i18n.__('cases.add', feed.user.name, feed.caseRef.caseType, feed.caseRef.caseNumber);
				} else {
					return false;
				}
			}
		},
		'cases.update': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'cases',
					'name': 'cases.update',
					'action': action,
					'caseRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					switch(feed.action){
						case "removed":
							return req.i18n.__('cases.update.removed', feed.user.name, feed.caseRef.caseType, feed.caseRef.caseNumber);
							break;
						default:
						return req.i18n.__('cases.update.updated', feed.user.name, feed.caseRef.caseType, feed.caseRef.caseNumber);
					}
				} else {
					return false;
				}
			}
		},
		'cases.update.docs': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'docs',
					'name': 'cases.update.docs',
					'action': 'upload',
					'caseRef': info.caseId,
					'subRef': info.info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed, subInfo) {
				if(feed && subInfo){
					return req.i18n.__('cases.update.docs', feed.user.name, subInfo.name);
				} else {
					return false;
				}
			}
		},
		'cases.update.docs.update': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'docs',
					'name': 'cases.update.docs.update',
					'action': action,
					'caseRef': info.caseId,
					'subRef': info.info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed, docInfo) {
				if(feed && docInfo){
					switch (feed.action) {
						case "removed":
							return req.i18n.__('cases.update.docs.update.removed', feed.user.name, docInfo.name);
							break;
						default:
							return req.i18n.__('cases.update.docs.update.updated', feed.user.name, docInfo.name);
					}
				} else {
					return false;
				}
			}
		},
		'memos.add': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'memos',
					'name': 'memos.add',
					'action': 'add',
					'caseRef': info.info.caseId,
					'subRef': info.info.updateId,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed, subInfo) {
				if(feed && subInfo){
					return req.i18n.__('memos.add', feed.user.name, subInfo.memoType, subInfo.memoId);
				} else {
					return false;
				}
			}
		},
		'memos.update': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'memos',
					'name': 'memos.update',
					'action': action,
					'caseRef': info.info.caseId,
					'subRef': info.info.updateId,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed, subInfo) {
				if(feed && subInfo){
					switch (feed.action) {
						case 'removed':
								return req.i18n.__('memos.update.removed', feed.user.name, subInfo.memoType, subInfo.memoId);
							break;
						case "closed":
							return req.i18n.__('memos.update.closed', req.i18n.__(feed.user.role), feed.user.name, subInfo.memoType, subInfo.memoId, subInfo.memoConsultant[subInfo.memoConsultant.length - 1].name);
							break;
						default:
								return req.i18n.__('memos.update.updated', req.i18n.__(feed.user.role), feed.user.name, subInfo.memoType, subInfo.memoId);
					}
				} else {
					return false;
				}
			}
		},
		'memos.update.consultant': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'memos',
					'name': 'memos.update.consultant',
					'action': action,
					'caseRef': info.caseId,
					'subRef': info.updateId,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed, subInfo) {
				if(feed && subInfo){
					switch(feed.action){
						case "add":
							return req.i18n.__('memos.update.consultant.updated', feed.user.name, subInfo.memoType, subInfo.memoId, subInfo.memoConsultant[subInfo.memoConsultant.length - 1].name);
							break;
						default:
							return false;
					}
				} else {
					return false;
				}
			}
		},
		'sessions.add': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'sessions',
					'name': 'sessions.add',
					'action': 'add',
					'caseRef': info.info.caseId,
					'subRef': info.info.sessionId,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed, subInfo) {
				if(feed && subInfo){
					return req.i18n.__('sessions.add', feed.user.name, feed.caseRef.caseNumber, feed.caseRef.caseType, feed.caseRef.court[0].name);
				} else {
					return false;
				}
			}
		},
		'sessions.update': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'sessions',
					'name': 'sessions.update',
					'action': action,
					'caseRef': info.info.caseId,
					'subRef': info.info.sessionId,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					switch (feed.action) {
						case 'removed':
							return req.i18n.__('sessions.update.removed', feed.user.name, feed.caseRef.caseNumber, feed.caseRef.caseType, feed.caseRef.court[0].name);
							break;
						default:
							return req.i18n.__('sessions.update.updated', feed.user.name, feed.caseRef.caseNumber, feed.caseRef.caseType, feed.caseRef.court[0].name);
					}
				} else {
					return false;
				}
			}
		},
		'sessions.update.tasks': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'sessions',
					'name': 'sessions.update.tasks',
					'action': 'update',
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					return req.i18n.__('sessions.update.tasks', feed.user.name);
				} else {
					return false;
				}
			}
		},
		'user.add': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'users',
					'name': 'user.add',
					'action': 'add',
					'userRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					return req.i18n.__('user.add', feed.user.name, req.i18n.__(feed.userRef.role), feed.userRef.name);
				} else {
					return false;
				}
			}
		},
		'user.update': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'users',
					'name': 'user.update',
					'action': action,
					'userRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					switch (feed.action) {
						case 'removed':
							return req.i18n.__('user.update.removed', feed.user.name, req.i18n.__(feed.userRef.role), feed.userRef.name);
							break;
						default:
							return req.i18n.__('user.update.updated', feed.user.name, req.i18n.__(feed.userRef.role), feed.userRef.name);
					}
				} else {
					return false;
				}
			}
		},
		'defendant.add': {
			prepare: function (user, info, action) {
				var feed = feedTemplate(user, {
					'group': 'defendants',
					'name': 'defendant.add',
					'action': action,
					'defendantRef': info._id,
					'reader': user,
					'user': user
				});
				return feed;
			},
			read: function (feed) {
				if(feed){
					return req.i18n.__('defendant.add', feed.user.name, feed.defendantRef.firstName, feed.defendantRef.lastName);
				} else {
					return false;
				}
			}
		}
	}


	return {
		send: function (listener, info) {
			io.emit(listener.toString(), info);
		},
		on: function (listener, info) {
			io.on(listener.toString(), info);
		},
		insert: function (name, user, info, cb, updateReport, action) {
			if(timeLineBuilder[name]){
				var self = this;
				if(!info) cb('info not provided');
				if(!timeLineBuilder[name]) cb('even is not registred');
				var feed = new feeds,
				newFeed = _.extend(feed, timeLineBuilder[name].prepare(user, info, action));

				newFeed.save(function (err, result) {
					if(err){
						cb(err);
					} else {
						//send socket.io to the feed name where there is expected to be listenrs for it in the other side (the front-end)
						self.send(name, info);
						//whethier the report must updated (is this feed represents data presented in the report page in front end and so report be updated)
						if(updateReport){
							self.send('reports.update', true);
						}
						//emit to the timeline
						self.send('timeline', true);
						cb(null, result);
					}
				});
			}
		},
		reader: function(cb){
			var self = this;
			//get the feeds with populated sub-documents
			feeds.find().populate('user').populate('reader').populate('userRef').populate('taskRef').populate('caseRef').populate('defendantRef').sort().exec(function (err, allFeeds) {
				if(err){
					cb(err);
				} else {
					//populdate the court
					courts.populate(allFeeds, [{path: 'caseRef.court'}], function (err, allFeeds) {
						users.populate(allFeeds, [{path: 'taskRef.responsibility'}, {path: 'taskRef.user'}, {path: 'caseRef.user'}, {path: 'caseRef.updates.memoConsultant'}, {path: 'defendantRef.user'}], function (err, result) {
							var timeLine = [];
							result.forEach(function (feed) {
								//get and populate case subDocs if required and aviliable
								var subInfo = '';
								if(feed.subRef && feed.group){
									switch(feed.group){
										case "memos":
											if(feed.caseRef.updates){
												subInfo = feed.caseRef.updates.id(feed.subRef);
											}
											break;
										case "sessions":
											if(feed.caseRef.sessions){
												subInfo = feed.caseRef.sessions.id(feed.subRef);
											}
											break;
										case "docs":
											if(feed.caseRef.docs){
												subInfo = feed.caseRef.docs.id(feed.subRef);
											}
											break;
									}
								}
								//build the feed
								if(timeLineBuilder[feed.name]){
									var feedInfo = timeLineBuilder[feed.name].read.apply(self, [feed , subInfo]);
									if(feedInfo){
										timeLine.push({'info': feedInfo, 'created': feed.created});
									}
								}
							});
							//sort it and serve the feeds
							var sort = _.sortBy(timeLine, 'created');
							cb(null, sort.reverse());
						});
					});
				}
			});
		}
	}
}

module.exports = function (app, io) {
	// Make io accessible to our router
	app.use(function(req, res, next){
		req.feeds = init(req, res, next, io);
		next();
	});
}
