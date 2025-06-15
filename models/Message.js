const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});
module.exports=mongoose.model("message",messageSchema);
