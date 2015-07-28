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
		required: 'تاريخ فتح الدعوى مطلوب'
	},
	reportNumber: {
		type: String,
		default: '',
		trim: true
	},
	caseNumber: {
		type: String,
		default: '',
		required: 'رقم الدعوى مطلوب',
		trim: true
	},
	subject: {
		type: String,
		default: '',
		required: 'موضوع الدعوى مطلوب',
		trim: true	
	},
	facts: {
		type: String,
		default: '',
		required: 'وقائع الدعوى مطلوبة',
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
	updates: [{
		updateType: {
			type: String,
			default: '',
			required: 'نوع التحديث مطلوب'
		},
		updateId: {
			type: String,
			default: ''
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
	}],
	sessions: [{
		newDate: {
			type: Date,
			required: 'تاريخ الجلسة مطلوب'
		},
		newTime: {
			type: String,
			default: '',
			required: 'التوقسق مطلوب'
		},
		updateId: {
			type: String,
			default: ''
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
	}],
	status: {
		type: String,
		default: 'open',
		enum: ['open', 'close', 'pendding'],
		lowercase: true
	},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('case', caseSchema);