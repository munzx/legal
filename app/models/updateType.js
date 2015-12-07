'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var updateTypesSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'نوع التحديث مطلوب'
	},
	requiredId: {
		type: Boolean,
		default: false
	},
	requireRoleUpdate: {
		type: Boolean,
		default: false
	},
	requiredIdTitle: {
		type: String,
		default: ''
	},
	requestMemo: {
		type: Boolean,
		default: false
	},
	requestMemoTitle: {
		type: String,
		default: ''
	},
	requireNextSession: {
		type: Boolean,
		default: false
	},
	requireDeadline: {
		type: Boolean,
		default: false
	},
	requireRemarks: {
		type: Boolean,
		default: false	
	},
	removed: {
		type: Boolean,
		default: 'false'
	},
	removeUser: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('updateType', updateTypesSchema);