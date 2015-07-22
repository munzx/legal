'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var defendantSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'إسم المدعي مطلوب',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'إسم المدعي مطلوب',
		trim: true	
	},
	address: {
		type: String,
		default: '',
		required: 'إسم المدعي مطلوب',
		trim: true
	},
	mobilePhone: {
		type: Number,
		default: '',
		required: 'إسم المدعي مطلوب',
		trim: true
	},
	role : {
		type: String,
		default: '',
		required: 'صفة الخصم مطلوبة',
		trim: true
	},
	roleHistory: [{
		type: String,
		default: '',
		trim: true
	}],
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});


module.exports = mongoose.model('defendant', defendantSchema);


