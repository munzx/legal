var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var caseSchema = mongoose.Schema({
	defendant: [{
		user: {
			type: Schema.Types.ObjectId,
			required: 'لم يتم إضافة خصوم',
			ref: 'defendant'
		},
		role: [{
			type: String,
			default: '',
			required: 'صفة الخصم مطلوبة',
			trim: true
		}],
		added: { //to see if the defendant has been added to a case from the begining or leter on "in case the user role was defendant"
			type: Boolean,
			default: 'false'
		},
		created: {
			type: Date,
			default: Date.now
		},
		removed: {
			type: Boolean,
			default: false
		},
		removeUser: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	}],
	client: [{
		user: {
			type: Schema.Types.ObjectId,
			required: 'لم يتم إضافة موكلين',
			ref: 'user'
		},
		role: [{
			type: String,
			default: '',
			required: 'صفة الخصم مطلوبة',
			trim: true
		}],
		added: { //to see if the client has been added to a case from the begining or leter on "in case the user role was client"
			type: Boolean,
			default: 'false'
		},
		created: {
			type: Date,
			default: Date.now
		},
		removed: {
			type: Boolean,
			default: false
		},
		removeUser: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	}],
	caseType: {
		type: String, 
		default: "",
		required: 'نوع الدعوى مطلوب'
	},
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
		refId: { //if any collection is linked to this update then insert the collection id here
			type: Schema.Types.ObjectId
		},
		updateType: {
			type: String,
			default: '',
			required: 'نوع التحديث مطلوب'
		},
		updateId: { //if the user wants to give this update an id (for examble report number)
			type: String,
			default: ''
		},
		updateInfo: {
			type: String,
			default: ''
		},
		memoRequired: {
			type: Boolean,
			default: false
		},
		memoId: { //for which "case update", for example "appealing" so the get the "appealing" ID, if not for any of the "case updates" then it should be for the case ID
			type: String,
			default: ''
		},
		memoType: { // similar to memoID , the type should get "case update -> updateType" or the case type
			type: String,
			default: ''
		},
		memoStatus: {
			type: String,
			default: 'pending',
			enum: ['closed', 'pending'],
			lowercase: true
		},
		deadline: {
			type: Date,
			default: ''
		},
		memoConsultant: [{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}],
		memosUploaded: [{
			doc: Schema.Types.ObjectId,
			created: { type: Date, default: Date.now }
		}],
		user: {
			type: Schema.Types.ObjectId,
			required: 'المستخدم مطلوب',
			ref: 'user'
		},
		created: {
			type: Date,
			default: Date.now
		},
		removed: {
			type: Boolean,
			default: false
		},
		removeUser: {
			type: Schema.Types.ObjectId,
			ref: 'user'
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
			required: 'التوقيت مطلوب'
		},
		user: {
			type: Schema.Types.ObjectId,
			required: 'المستخدم مطلوب',
			ref: 'user'
		},
		lawyer: [{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}],
		refType: { //the reference type i.e the update
			type: String,
			default: '',
			required: 'نوع الجلسة مطلوب'
		},
		refNumber: {
			type: String,
			default: '',
			required: 'رقم الجلسة مطلوب'
		},
		created: {
			type: Date,
			default: Date.now
		},
		removed: {
			type: Boolean,
			default: false
		},
		removeUser: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	}],
	status: {
		type: String,
		default: 'open',
		enum: ['open', 'close', 'pendding'],
		lowercase: true
	},
	removed: {
		type: Boolean,
		default: false
	},
	removeDate: {type: Date, default: Date.now},
	removeUser: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	docs:  [{
		description: {
			type: String,
			required: 'file description is required',
			default: '',
			trim: true,
			lowercase: true
		},
		name: {
			type: String,
			required: 'file name is required',
			default: '',
			trim: true,
			lowercase: true
		},
		path: {
			type: String,
			required: 'file name is required',
			default: '',
			trim: true,
			lowercase: true
		},
		removed: {
			type: Boolean,
			default: 'false'
		},
		removeUser: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		created: {type: Date, default: Date.now},
		user: {
			type: Schema.Types.ObjectId,
			required: 'معرف المستخدم مطلوب',
			ref: 'user'
		}
	}],
	user: {
		type: Schema.Types.ObjectId,
		required: 'لم يتم إضافة بيانات المدخل',
		ref: 'user'
	},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('case', caseSchema);