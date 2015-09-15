var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var calenderSchema = new Schema({
	task: {
		type: String,
		required: 'please provide the task',
		trim: true,
		default: ''
	},
	description: {
		type: String,
		required: 'please provide description',
		trim: true,
		default: ''
	},
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	responsibility: { type: Schema.Types.ObjectId, ref: 'user' },
	status: {
		type: String,
		enum: ['close', 'pending'],
		trim: true,
		lowercase: true,
		default: 'pending'
	},
	removed: {
		type: Boolean,
		default: false
	},
	rejected: {
		type: Boolean,
		default: false
	},
	deadLine: {
		type: Date,
		required: 'please provide the deadLine'
	},
	created: {
		type: Date,
		default: Date.now()
	}
});


module.exports = mongoose.model('calendar', calenderSchema);