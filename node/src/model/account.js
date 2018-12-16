import mongoose from 'mongoose';
const Schema from mongoose.Schema;

import passportLocalMongoose from 'passport-local-mongoose';

let Account - new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

Account.plugin()
