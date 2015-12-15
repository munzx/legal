'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var feedSchema = new Schema({
	feedName: {//the feedName is used by socket.io to know which event to emit in backendand which to listen to in the frontend
		type: String,
		default: '',
		required: 'please provide the feed name',
		trim: 'true'
	},
	feedType: { //for example : "tasks"
		type: String,
		default: '',
		required: 'please provide the feed type',
		trim: 'true'
	},
	feedDesc: { // for example the feed is a new task , the task info is "call someone", so the feed info is call someone
		type: String,
		default: '',
		trim: 'true'
	},
	feedUser: { //user that the feed belongs to
		type: Schema.Types.ObjectId,
		required: 'user is required',
		ref: 'user'
	},
	feedToUser: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	feedAction: { //remove, add , done, closed, update etc..
		type: String,
		default: ''
	},
	feedDeadline: {
		type: Date,
		default: ''
	},
	feedCreated: {
		type: Date,
		default: Date.now
	},
	reader: [{type: Schema.Types.ObjectId, required: 'please provide the reader info', ref: 'user'}],
	feedRef: {type: Schema.Types.ObjectId},
	feedCollection: {
		type: String,
		default: '',
		trim: true
	},
	created: {type: Date, default: Date.now}
});


module.exports = mongoose.model('feeds', feedSchema);