

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
   Name : {
		type: String,
		required: true
	},
	 Category : {
		type: String,
		required: true
	},
	Type : {
		type: String,
		required: true
	},
	Balance : {
		type: Number,
		required: true
	},
	Rate : {
		 type: Number,
		required: true
	}
});
module.exports  = mongoose.model('Account',AccountSchema,'Account');


