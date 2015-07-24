var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var caseSchema = mongoose.Schema({
	defendant: [{ type: Schema.Types.ObjectId, ref: 'defendant' }],
	client: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	caseDate: {
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
	court: [{ type: Schema.Types.ObjectId, ref: 'court' }],
	consultant: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	created: {type: Date, default: Date.now},
	status: {
		type: String,
		default: 'open',
		enum: ['open', 'close', 'pendding'],
		lowercase: true
	}
});


module.exports = mongoose.model('case', caseSchema);