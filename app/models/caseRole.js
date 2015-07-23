'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var caseRoleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'إسم الصفة مطلوب',
		trim: true,
		unique: true
	},
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('caseRole', caseRoleSchema);