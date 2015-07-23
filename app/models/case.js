var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var caseSchema = mongoose.Schema({
	defendant: [{ type: Schema.Types.ObjectId, ref: 'defendant' }],
	client: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	clientRole: {
		type: String,
		default: '',
		trim: true,
		enum: ['claimant', 'respondant']
	},
	clientRoleHistory: [{
		type: String,
		default: '',
		trim: true
	}],
	created: {
		type: Date, 
		default: "",
		required: 'تاريخ فتح القضية مطلوب'
	},
	reportNumber: {
		type: String,
		default: '',
		required: 'رقم البلاغ',
		trim: true
	},
	caseNumber: {
		type: String,
		default: '',
		required: 'رقم القضية مطلوب',
		trim: true
	},
	subject: {
		type: String,
		default: '',
		required: 'موضوع القضية مطلوب',
		trim: true	
	},
	facts: {
		type: String,
		default: '',
		required: 'وقائع القضية مطلوبة',
		trim: true
	},
	court: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	consultant: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now}
});


module.exports = mongoose.model('case', caseSchema);