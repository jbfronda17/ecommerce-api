const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/userSchema.js");

// User registration
module.exports.userRegistration = (req, res) => {
	let input = req.body;
	User.findOne({email: input.email})
	.then(result => {
		// Check if email already exists
		if(result !== null){
			return res.send("Email already exists!");
		}
		else{
			// Create a new user
			let newUser = new User({
				firstName: input.firstName,
				lastName: input.lastName,
				email: input.email,
				mobile: input.mobile,
				password: bcrypt.hashSync(input.password, 10)
			})
			newUser.save()
			.then(save => res.send("You are now registered!"))
			.catch(error => res.send(error));
		}
	})
	.catch(error => res.send(error));
};