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
	//form data the user has sent
	var formData = {};
	formData.firstName = req.body.firstName;
	formData.lastName = req.body.lastName;
	formData.email = req.body.email;
	formData.pageDesc = req.body.pageDesc || '';
	if(req.body.mobilePhone){ formData.mobilePhone = req.body.mobilePhone};

	var base64Data = "",
	dest = 'public/uploads/';

	//remove image files
	function removeImages () {
		if (fs.existsSync(dest + bannerName)) {fs.unlink(dest + bannerName)};
		if (fs.existsSync(dest + logoName)) {fs.unlink(dest + logoName)};
	}

	//A function to give unique name to each image file
	function getNewName (initial) {
		if(!initial){
			initial = 'name';
		}
		return initial + '.' + req.user.name + '.' + Math.floor(new Date() / 1000) + '.jpg'
	}

	//make unique names for image files
	var bannerName = getNewName('banner'),
	logoName = getNewName('logo'),
	//get the images data
	banner = req.body.banner,
	logo = req.body.logo,
	//clean images of unnecessary data in order to make images out of the base64 data recieved
	bannerData = (banner.length > 1000) ?  banner.replace(/^data:image\/\w+;base64,/, ""):false,
	logoData = (logo.length > 1000) ?  logo.replace(/^data:image\/\w+;base64,/, ""):false;

	//write the images data to files
	function saveBanner (callback) {
		if(bannerData){
			fs.writeFile(dest + bannerName, bannerData, 'base64', function(err) {
				if(err){ bannerName = false; return callback(err); } else { formData.banner = bannerName; callback(null); };
			});
		} else {
			callback(null);
		}
	}

	//write the images data to files
	function saveLogo (callback) {
		if(logoData){
			fs.writeFile(dest + logoName, logoData, 'base64', function(err) {
				if(err){ logoName = false; return callback(err); } else { formData.logo = logoName; callback(null); };
			});
		} else {
			callback(null);
		}
	}

	async.parallel([saveBanner, saveLogo], function (err) {
		if(err){
			res.status(400).jsonp({message: 'Unkown error has occured, please try again or contact yousufalsharif\'s Support Team'});
		} else {
			users.findOne({_id: req.user._id}, function(err, user){
				if(err){
					removeImages();
					res.status(500).jsonp({message: err});
				} else if(user) {
					user.firstName = formData.firstName;
					user.lastName = formData.lastName;
					user.email = formData.email;
					user.mobilePhone = formData.mobilePhone;
					user.pageDesc = formData.pageDesc;
					user.save();

					if(formData.banner){
						if (fs.existsSync(dest + user.banner)) {fs.unlink(dest + user.banner)};
						user.banner = formData.banner;
					}

					if(formData.logo){
						if (fs.existsSync(dest + user.logo)) {fs.unlink(dest + user.logo)};
						user.logo = formData.logo;
					}

					res.status(200).jsonp(user);
				} else {
					res.status(404).json({message: 'User has not been found'});
				}
			});
		}
	});
}

//update the user password
module.exports.changePassword = function(req, res){
	users.findOne({_id: req.user._id, password: req.body.currentPassword},function(err, user){
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
module.exports.remove = function(req, res){
	var dest = 'public/uploads/';
	if(req.params.id){
		users.findById(req.params.id, function(err, user){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else if(user){
				user.remove(function (err) {
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp('تم محو بيانات المستخدم بنجاح')
					}
				});
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