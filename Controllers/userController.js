const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/userSchema.js");
const auth = require("../auth.js");

// User registration
module.exports.userRegistration = (req, res) => {
	let input = req.body;
	// Check if email already exists
	User.findOne({email: input.email})
	.then(result => {
		if(result !== null){
			return res.send("This email is already in use!");
		}
		else{
			// Check if mobile number already exists
			User.findOne({mobile: input.mobile})
			.then(result => {
				if(result !== null){
					return res.send("This mobile number is already in use!")
				}
				// Create a new user
				else{
					let newUser = new User({
						firstName: input.firstName,
						lastName: input.lastName,
						email: input.email,
						mobile: input.mobile,
						password: bcrypt.hashSync(input.password, 10)
					})
					newUser.save()
					.then(user => res.send(user))
					.catch(error => res.send(error));
				}
			})
			.catch(error => res.send(error));
		}
	})
	.catch(error => res.send(error));
};

// User authentication (Login)
module.exports.userAuthentication = (req, res) => {
	let input = req.body;
	User.findOne({email: input.email})
	.then(result => {
		// Check if email is already registered
		if(result === null){
			return res.send("This email is not yet registered, please register first!")
		}
		// Check if password is correct
		else{
			const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)
			if(isPasswordCorrect){
				// Returns the created access token
				return res.send({auth: auth.createAccessToken(result)});
			}
			else{
				return res.send("Wrong password, please try again!");
			}
		}
	})
	.catch(error => res.send(error));
};

// User details
module.exports.userDetails = (req, res) => {
	// Retrieve payload
	const userData = auth.decode(req.headers.authorization);
	User.findById(userData._id)
	.then(result => {
		result.password = "hidden";
		return res.send(result);
	})
};