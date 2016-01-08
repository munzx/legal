'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var passportLocal = require('passport-local');
var user = require('./../../api/v1/models/user');



module.exports = function () {
	//initilize passport local strategy
	//exculde password
	passport.use(new passportLocal.Strategy(function(username, password, done){
		user.findOne({name: username.toLowerCase()}, function(err, userInfo){
			if(err){
				done(err);
			} else {
				if(userInfo){
					userInfo.comparePasswords(password, function (err, isMatch) {
						if(err) done(err);
						if(isMatch){
							done(null, userInfo);
						} else {
							done(isMatch);
						}
					});
				} else {
					done(null);
				}
			}
		});
	}));

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});


	//exclude password
	passport.deserializeUser(function(id, done){
		user.findOne({_id: id, 'removed': false}, {password: 0}).exec(function(err, user){
			if(err){
				done(err);
			} else {
				done(null, user)
			}
		});
	});
}; //initilize passport