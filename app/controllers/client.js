'use strict';

var mongoose = require('mongoose'),
	users = require('../models/user'),
	errorHandler = require('./error'),
	clients = require('../models/clients'),
	_ = require('lodash');

module.exports.index = function (req, res) {
	users.find({'role': 'client'}, function(err, result){
		if(err){
			res.status(500).jsonp({message: err});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.create = function(req, res){
	var client = new clients(),
		clientInfo = _.extend(client, req.body.clientInfo);

	clientInfo.save(function(err, result){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(result);
		}
	});
}

module.exports.remove = function(req, res){
	if(req.params.id){
		clients.findById(req.params.id, function(err, client){
			if(err){
				res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
			} else {
				client.remove(function(err){
					if(err){
						res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
					} else {
						res.status(200).jsonp('تم محو بيانات العميل بنجاح')
					}
				});
			}
		});
	} else {
		res.status(500).jsonp({message: 'لم يتم توفير معرف العميل'});
	}
}