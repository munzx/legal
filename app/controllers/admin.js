'use strict';

// Depnedencies
var mongoose = require('mongoose'),
errorHandler = require('./error'),
lookup = require('country-data').lookup,
fs = require('fs'),
async = require("async"),
_ = require('lodash'),
users = require('../models/user'),
accounts = require('../models/account'),
contacts = require('../models/contact'),
moment = require('moment'),
lineChart = require('../helpers/lineChart'),
dateInput = require('../helpers/dateInput');

module.exports.createFirst = function (req, res) {
	users.find({role: 'admin'}, {password: 0}, function (err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user.length > 0){
			res.status(500).jsonp('Admin Exists');
		} else {
			var countryInfo = lookup.countries({name: 'United Arab Emirates'})[0];
			var country = [{
				name: countryInfo.name,
				code: countryInfo.alpha2,
				callingCode: countryInfo.countryCallingCodes[0],
				currency: countryInfo.currencies[0],
				language: countryInfo.languages[0]
			}];

			var newUser = new users({
				firstName: 'root',
				lastName: 'admin',
				name: 'admin',
				role: 'admin',
				email: 'munzir.suliman@outlook.com',
				password: 'Dubai@123',
				country: country
			});

			newUser.save(function(err, user){
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else {
					res.status(200).jsonp(user);
				}
			});
		}
	});
}

module.exports.index = function (req, res) {
	users.find({role: 'admin'}, {password: 0}).where('name').ne('admin').exec(function (err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(user);
		}
	});
}

module.exports.users = function (req, res) {
	var limit = 0,
	skip = 0;

	if(req.params.limit){
		limit = req.params.limit;
	}

	if(req.params.skip){
		skip = req.params.skip;
	}

	users.find({'role': 'user'}, {password: 0}, {limit: req.params.limit, skip: req.params.skip}).sort({created: -1}).exec(function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp({'users': user, count: user.length});
		} else {
			res.status(404).jsonp({message: 'No user has been found'});
		}
	});
}