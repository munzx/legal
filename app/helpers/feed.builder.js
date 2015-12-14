'use strict';

var feeds = require('../models/feed'),
	_ = require('lodash'),
	moment = require('moment-range');


module.exports = function (io) {

	var feedTemplate = function (user, info) {
		return {
			'feedName': info.feedName,
			'feedType': info.feedType,
			'feedDeadline': info.feedDeadline,
			'feedAction': info.feedAction,
			'feedRef': info.feedRef,
			'feedCollection': info.feedCollection,
			'feedDesc': info.feedDesc,
			'feedToUser': info.feedToUser,
			'reader': user,
			'feedUser': user
		}
	}

	//read: excepts 'feed' info from the 'feeds' collection 'database'
	var timeLineBuilder = {
		'tasks.add': {
			prepare: function  (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'tasks.add',
					feedType: 'task',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'calendar',
					feedDesc: info.task
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has added a new ' + feed.feedType + ' ' + feed.feedDesc;
			}
		},
		'tasks.update': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'tasks.update',
					feedType: 'task',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'calendar',
					feedDesc: info.task
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
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
				return feed.feedUser.name + ' has ' + action + ' a ' + feed.feedType + ' ' + feed.feedDesc;
			}
		},
		'cases.add': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'cases.add',
					feedType: 'case',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'case',
					feedDesc: info.caseType + ' ' + info.caseNumber
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has inserted a new case ' + feed.feedDesc;
			}
		},
		'cases.update': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'cases.update',
					feedType: 'case',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'case',
					feedDesc: info.caseType + ' ' + info.caseNumber
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'updated'
				}
				return feed.feedUser.name + ' has ' + action + ' the case ' + feed.feedDesc;	
			}
		},
		'cases.update.docs': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'cases.update.docs',
					feedType: 'case',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'case',
					feedDesc: info.name
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'uploaded'
				}
				return feed.feedUser.name + ' has ' + action + ' the document ' + feed.feedDesc;	
			}
		},
		'cases.update.docs.update': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'cases.update.docs',
					feedType: 'case',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'case',
					feedDesc: info.name
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'uploaded'
				}
				return feed.feedUser.name + ' has ' + action + ' the document ' + feed.feedDesc;	
			}
		},
		'memos.add': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'memos.add',
					feedType: 'memo',
					feedAction: feedAction,
					feedRef: info.info.updateId,
					feedCollection: 'case',
					feedDesc: info.info.updateType + ' ' + info.info.memoType
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has added a new memo ' + feed.feedDesc;
			}
		},
		'memos.update': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'memos.update',
					feedType: 'memo',
					feedAction: feedAction,
					feedRef: info.info.updateId,
					feedCollection: 'case',
					feedDesc: info.info.updateType + ' ' + info.info.memoType
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'updated'
				}
				return feed.feedUser.name + ' has ' + action + ' the memo ' + feed.feedDesc;	
			}
		},
		'memos.update.consultant': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'memos.update.consultant',
					feedType: 'memo',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'case',
					feedToUser:   info.memoConsultant[info.memoConsultant.length - 1],
					feedDesc: info.memoType + ' ' + info.memoId
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has assigned the memo ' + feed.feedDesc + ' to ' + feed.feedToUser.name;	
			}
		},
		'sessions.add': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'sessions.add',
					feedType: 'session',
					feedAction: feedAction,
					feedRef: info.info.sessionUpdateId,
					feedCollection: 'case',
					feedDesc: info.info.court[0].name + ' ' + info.info.refType + ' ' + info.info.refNumber
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has added a new session, ' + feed.feedDesc;
			}
		},
		'sessions.update': {
			prepare: function (user, info, feedAction) {
				console.log(info);
				var feed = feedTemplate(user, {
					feedName: 'sessions.update',
					feedType: 'session',
					feedAction: feedAction,
					feedRef: info.info.sessionUpdateId,
					feedCollection: 'case',
					feedDesc: info.info.court[0].name + ' ' + info.info.refType + ' ' + info.info.refNumber
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'updated'
				}
				return feed.feedUser.name + ' has ' + action + ' sessions ' + feed.feedDesc;	
			}
		},
		'sessions.update.tasks': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'sessions.update.tasks',
					feedType: 'session',
					feedAction: feedAction,
					feedCollection: 'case'
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has updated sessions tasks';	
			}
		},
		'user.add': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'user.add',
					feedType: 'user',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'user',
					feedDesc: info.role + ' ' + info.name
				});
				return feed;
			},
			read: function (feed) {
				return feed.feedUser.name + ' has added the ' + feed.feedDesc;	
			}
		},
		'user.update': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'user.update',
					feedType: 'user',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'user',
					feedDesc: info.role + ' ' + info.name
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'updated'
				}
				return feed.feedUser.name + ' has ' + action + ' ' + feed.feedDesc;	
			}
		},
		'defendant.add': {
			prepare: function (user, info, feedAction) {
				var feed = feedTemplate(user, {
					feedName: 'defendant.add',
					feedType: 'defendant',
					feedAction: feedAction,
					feedRef: info._id,
					feedCollection: 'user',
					feedDesc: info.firstName + ' ' + info.lastName
				});
				return feed;
			},
			read: function (feed) {
				var action = '';
				switch(feed.feedAction){
					case "removed":
						action = 'removed';
						break;
					default:
						action = 'added'
				}
				return feed.feedUser.name + ' has ' + action + ' a defendant: ' + feed.feedDesc;	
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
		insert: function (feedName, user, info, cb, updateReport, feedAction) {
			if(timeLineBuilder[feedName]){
				var self = this;
				if(!info) cb('info not provided');
				if(!timeLineBuilder[feedName]) cb('even is not registred');
				var feed = new feeds,
					newFeed = _.extend(feed, timeLineBuilder[feedName].prepare(user, info, feedAction));

				newFeed.save(function (err, result) {
					if(err){
						cb(err);
					} else {
						self.send(feedName, info);
						if(updateReport){
							self.send('reports.update', true);
						}
						cb(null, result);
					}
				});
			}
		},
		reader: function(cb){
			var timeLine = [];
			feeds.find({}).populate('feedUser').populate('feedToUser').exec(function (err, allFeeds) {
				if(err){
					cb(err);
				} else {
					allFeeds.forEach(function (feed) {
						if(timeLineBuilder[feed.feedName]){
							timeLine.push(timeLineBuilder[feed.feedName].read(feed));
						}
					});
					cb(null, timeLine);
				}
			});
		}
	}
}