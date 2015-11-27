'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var caseTypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'إسم النوع مطلوب',
		trim: true,
		unique: true
	},
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('caseType', caseTypeSchema);