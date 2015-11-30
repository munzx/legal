'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var courtSchema = new Schema({
	name: {
		type: String,
		required: 'إسم المحكمة مطلوب',
		default: '',
		trim: true,
		unique: true
	},
	city: {
		type: String,
		required: 'إسم المدينة مطلوب',
		default: '',
		trim: true
	},
	address: {
		type: String,
		required: 'عنواو المحكمة مطلوب',
		default: '',
		trim: true
	},
	removed: {
		type: Boolean,
		default: 'false'
	},
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('court', courtSchema);