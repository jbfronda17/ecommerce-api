const mongoose = require("mongoose");

// Declare the Schema of the "User" model
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"]
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"]
	},
	mobile: {
		type: String,
		unique: true,
		required: [true, "Mobile Number is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

// Export the model
module.exports = mongoose.model("User", userSchema);