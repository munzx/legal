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
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('updateType', updateTypesSchema);