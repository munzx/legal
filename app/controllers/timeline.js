'use strict';

var feeds = require('../models/feed'),
	_ = require('lodash'),
	moment = require('moment-range'),
	errorHandler = require('./error');


module.exports.index = function (req, res) {
	req.feeds.reader(function (err, allFeeds) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(allFeeds);
		}
	});
}