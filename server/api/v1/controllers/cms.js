'use strict';

var mongoose = require('mongoose'),
	_ = require('lodash'),
	errorHandler = require('./error');

module.exports.contactIndex = function (req, res) {
	res.status(200).jsonp('Bism Allah , here is the contacts');
}

module.exports.contact = function (req, res) {
	var contact = new contacts(req.body);

	contact.save(function (err, newContact) {
		if(err){
			//send me and email
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp('Contact has been sent successfully');
		}
	});
}