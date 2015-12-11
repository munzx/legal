'use strict';

// Depnedencies
var mongoose = require('mongoose'),
errorHandler = require('./error'),
lookup = require('country-data').lookup,
fs = require('fs'),
async = require("async"),
_ = require('lodash'),
users = require('../models/user'),
accounts = require('../models/account');

// get all users
module.exports.index = function (req, res){
	users.find({}, {password: 0}).where('name').ne('admin').exec(function (err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(user);
		}
	});
}

module.exports.available = function (req, res){
	users.find({removed: 'false'}, {password: 0}).where('name').ne('admin').exec(function (err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(user);
		}
	});
} 

// create a new user
module.exports.create = function(req, res){
	var user = new users(),
		userInfo = _.extend(user, req.body.userInfo);

	//if the role is empty or not employee, client or admin then return error message
	if(userInfo.role !== undefined){
		var valid = false;
		switch(userInfo.role.toLowerCase()){
			case "admin":
				valid = true;
				break;
			case "client":
				valid = true;
				break;
			case "employee":
				valid = true;
				break;
			case "consultant":
				valid = true;
				break;
			default:
				valid = false;
		}

		if(valid){
			//only admin can create employees and other admins
			//admin and employees can create clients
			//employee can not create another employee or admin
			if(req.user.role.toLowerCase() !== 'admin' && userInfo.role.toLowerCase() !== 'client'){
				res.status(403).jsonp({message: 'لايمكن الدخول'});
			} else {
				user.save(function(err, user){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp(user);
						req.io.emit('user.add', user);
						req.io.emit('user.available.add', user);
					}
				});
			}
		} else {
			res.status(403).jsonp({message: 'لايمكن الدخول'});
		}

	} else {
		res.status(500).jsonp({message: 'نوع المستخدم مطلوب'});
	}
}

// get user by name
module.exports.getByName = function (req, res){
	users.findOne({role: 'user', name: req.params.name}, {password: 0}, function(err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp(user);
		} else {
			res.status(404).json({message: 'User has not been found'});
		}
	});
}

//update user by id
module.exports.update = function(req, res){
	users.findOne({_id: req.user._id}, function (err, userInfo) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(userInfo) {
			var newInfo = {};
			if(req.body.info.mobilePhone){
				newInfo.mobilePhone = req.body.info.mobilePhone;
			}

			if(req.body.info.email){
				newInfo.email = req.body.info.email;
			}

			var saveInfo = function () {
				var newUserInfo = _.extend(userInfo, newInfo);
				newUserInfo.save(function (err, result) {
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp(result);
					}
				});
			}

			if(req.body.info.newPassowrd){
				userInfo.comparePasswords(req.body.info.currentPassowrd, function (err, isMatch) {
					if(isMatch){
						newInfo.password = req.body.info.newPassowrd;
						saveInfo();
					} else {
						res.status(500).jsonp({message: 'Current password is not correct'});
					}
				});
			} else {
				saveInfo();
			}
		} else {
			res.status(500).jsonp({message: 'User not found'});
		}
	});
}

//update the user password
module.exports.changePassword = function(req, res){
	users.findOne({_id: req.user._id, password: req.body.currentPassowrd},function(err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			user.password = req.body.newPassword;
			user.save(function (err, userInfo) {
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else {
					res.status(200).jsonp(user);
				}
			});
		} else {
			res.status(401).json({message: 'Current password is not correct'});
		}
	});
}

//delete user by id
module.exports.softRemove = function(req, res){
	var dest = 'public/uploads/';
	if(req.params.id){
		users.findById(req.params.id, function(err, user){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else if(user){
				user.removed = true;
				user.removeUser = req.user._id;
				if(user.removed && user.removeUser){
					user.save(function (err, userInfo) {
						if(err){
							res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
						} else {
							res.status(200).jsonp(userInfo);
						req.io.emit('user.update', userInfo);
						req.io.emit('user.available.update', userInfo);
						}
					});
				} else {
					res.status(500).jsonp({message: 'لم يتم توفير البيانات اللازمة'});
				}
			} else {
				res.status(500).jsonp({message: 'لم يتم العثور على المستخدم'});
			}
		});
	} else {
		res.status(500).jsonp({message: 'يرجى إضافة رقم المعرف الخاص بالموظف'});
	}
}

module.exports.search = function(req, res){
	if(req.params.phrase){
		var re = new RegExp(req.params.phrase, "i");
		users.find().or([ {'firstName': {$regex: re}}, {'lastName': {$regex: re}}, {'mobilePhone': {$regex: re}}, {'address': {$regex: re}}, {'name': {$regex: re}}, {'email': {$regex: re}} ]).exec(function(err, result){
			if(err){
				res.status(500).jsonp(err);
			} else {
				res.status(200).jsonp(result);
			}
		});
	} else {
		res.status(500).jsonp('search phrase not provided');
	}
}