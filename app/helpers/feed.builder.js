'use strict';

var feeds = require('../models/feed'),
_ = require('lodash'),
moment = require('moment-range');


var localize = function (word) {
   if(!word){ return false};
	var words = {
      'admin': 'أدمن',
      'client': 'موكل',
      'employee': 'موظف',
      'consultant': 'مستشار',
      'defendant': 'خصم',
      'uploaded': 'رفع',
      'removed': 'حذف',
      'updated': 'تحديث',
      'task': 'مهمة',
      'marked done': 'إنهاء'
   }
   return words[word.toLowerCase()] || word;
}

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
			return feed.feedUser.name + ' قام بإضافة ' + localize(feed.feedType) + ' (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' قام ب' + localize(action) + ' ' + localize(feed.feedType) + ' (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' أضاف قضية (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' قام ب' + localize(action) + ' القضية ( ' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' ' + localize(action) + ' المستند (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' قام ب' + localize(action) + ' المستند (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' قام بإضافة المذكرة (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' قام ب' + localize(action) + ' المذكرة (' + feed.feedDesc + ')';
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
			return feed.feedUser.name + ' أوكل مذكرة (' + feed.feedDesc + ') إلى ' + feed.feedToUser.name;
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
				feedDesc: info.info.court[0].name + ' ,' + info.info.refType + ' ' + info.info.refNumber
			});
			return feed;
		},
		read: function (feed) {
			return feed.feedUser.name + ' قام بإضافة جلسة  (' + feed.feedDesc + ') ';
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
				feedDesc: info.info.court[0].name + ' , ' + info.info.refType + ' ' + info.info.refNumber
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
			return feed.feedUser.name + ' قام ' + localize(action) + ' جلسة ' + feed.feedDesc;
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
			return feed.feedUser.name + 'قام بتحديث المهام';
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
			return feed.feedUser.name + ' قام بإضافة ' + localize(feed.feedDesc);
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
			return feed.feedUser.name + ' قام ' + localize(action) + 'ب  ' + feed.feedDesc;
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
			return feed.feedUser.name + ' قام ب' + localize(action) + ' الخصم ' + feed.feedDesc;
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
						//send socket.io to the feed name where there is expected to be listenrs for it in the other side (the front-end)
						self.send(feedName, info);
						//if the report must updated (is this feed represents data presented in the report page in front end and so report be updated)
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
			var timeLine = [];
			feeds.find({}).populate('feedUser').populate('feedToUser').sort().exec(function (err, allFeeds) {
				if(err){
					cb(err);
				} else {
					allFeeds.forEach(function (feed) {
						if(timeLineBuilder[feed.feedName]){
							timeLine.push({'info': timeLineBuilder[feed.feedName].read(feed)});
						}
					});
					cb(null, timeLine.reverse());
				}
			});
		}
	}
}
