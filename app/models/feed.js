'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var feedSchema = new Schema({
	name: {//the feedName is used to build the feed and also used by socket.io to know which event to emit in backendand which to listen to in the frontend
		type: String,
		default: '',
		required: 'please provide the feed name',
		trim: true
	},
	group: {
		type: String,
		default: '',
		required: 'please provide the group name',
		trim: true
	},
	action: { //remove, add , done, closed, update etc..
		type: String,
		default: ''
	},
	subRef: Schema.Types.ObjectId,
	taskRef: {type: Schema.Types.ObjectId, ref: 'calendar'},
	caseRef: {type: Schema.Types.ObjectId, ref: 'case'},
	defendantRef: {type: Schema.Types.ObjectId, ref: 'defendant'},
	userRef: {type: Schema.Types.ObjectId, ref: 'user'},
	reader: [{type: Schema.Types.ObjectId, required: 'please provide the reader info', ref: 'user'}],
	user: {type: Schema.Types.ObjectId,required: 'user is required', ref: 'user'},//user that the feed belongs to
	created: {type: Date, default: Date.now}
});


module.exports = mongoose.model('feeds', feedSchema);