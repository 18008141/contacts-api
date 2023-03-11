const mongoose = require('mongoose');
const contact = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	email: {
		require: true,
		type: String
	},
	phone: {
		required: true,
		type: Number
	}
}, { collection: 'contacts'});

module.exports = mongoose.model('uni', contact);