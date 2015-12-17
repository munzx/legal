'use strict';

var feeds = require('../models/feed'),
_ = require('lodash'),
users = require('../models/user'),
cases = require('../models/case'),
moment = require('moment-range');


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
				return feed.taskRef.user.name + ' has added a new task ' + feed.taskRef.task;
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
				return feed.taskRef.user.name + ' has ' + actionType(feed.action) + ' the task ' + feed.taskRef.task;
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
				return feed.user.name + ' has added a new case , ' + feed.caseRef.caseType + ' ' + feed.caseRef.caseNumber;
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
				return feed.user.name + ' has ' + actionType(feed.action) + ' case ' + feed.caseRef.caseType + ' ' + feed.caseRef.caseNumber;
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
				return feed.user.name + ' has uploaded the document ' + subInfo.name;
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
				return feed.user.name + ' has ' + actionType(feed.action) + ' document ' +  docInfo.name;
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
				return feed.user.name + ' has added a new momo ' + subInfo.memoType + ' ' + subInfo.memoId;
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
				return feed.user.name + ' has ' + actionType(feed.action) + ' memo ' + subInfo.memoType + ' ' + subInfo.memoId;
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
		read: function (feed) {
			if(feed){

			} else {
				return false;
			}
			return feed.user.name;
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
				return feed.user.name + ' has added a new session to case ' +  feed.caseRef.caseNumber + ' ' + feed.caseRef.caseType;
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
				return feed.user.name;
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

			} else {
				return false;
			}
			return feed.user.name;
		}
	},
	'user.add': {
		prepare: function (user, info, action) {
			var feed = feedTemplate(user, {
				'group': 'users',
				'name': 'user.add',
				'action': 'add',
				'userRef': info._.id,
				'reader': user,
				'user': user
			});
			return feed;
		},
		read: function (feed) {
			if(feed){

			} else {
				return false;
			}
			return feed.user.name;
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

			} else {
				return false;
			}
			return feed.user.name;
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

			} else {
				return false;
			}
			return feed.user.name;
		}
	}
}

module.exports = function (io) {
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
			//get the feeds with populated sub-documents
			feeds.find().populate('user').populate('reader').populate('userRef').populate('taskRef').populate('caseRef').populate('defendantRef').sort().exec(function (err, allFeeds) {
				if(err){
					cb(err);
				} else {
					users.populate(allFeeds, [{path: 'taskref.user'}], function (err, result) {
						var timeLine = [];
						result.forEach(function (feed) {
							//populate case subDocs if required and aviliable
							if(feed.subRef && feed.group){
								var subInfo = '';
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
							if(timeLineBuilder[feed.name]){
								var feedInfo = timeLineBuilder[feed.name].read(feed , subInfo);
								if(feedInfo){
									timeLine.push({'info': feedInfo});
								}
							}
						});
						cb(null, timeLine.reverse());
					});
				}
			});
		}
	}
}
