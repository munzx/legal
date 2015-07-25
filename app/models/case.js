var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var caseSchema = mongoose.Schema({
	defendant: [{
		type: Schema.Types.ObjectId,
		required: 'لم يتم إضافة خصوم',
		ref: 'defendant'
	}],
	client: [{
		type: Schema.Types.ObjectId,
		required: 'لم يتم إضافة موكلين',
		ref: 'user' 
	}],
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
	court: [{
		type: Schema.Types.ObjectId,
		required: 'لم يتم إضافة محاكم',
		ref: 'court' 
	}],
	consultant: [{
		type: Schema.Types.ObjectId,
		required: '',
		ref: 'user' 
	}],
	created: {type: Date, default: Date.now},
	updates: [
		{
			updateType: {
				type: String,
				default: '',
				required: 'نوع التحديث مطلوب'
			},
			updateInfo: {
				type: String,
				default: '',
				required: 'الملاحظات مطلوبة'
			},
			user: {
				type: Schema.Types.ObjectId,
				required: 'المستخدم مطلوب',
				ref: 'user'
			},
			created: {
				type: Date,
				default: Date.now
			}
		}
	],
	status: {
		type: String,
		default: 'open',
		enum: ['open', 'close', 'pendding'],
		lowercase: true
	}
});

module.exports = mongoose.model('case', caseSchema);