const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/userSchema.js");
const auth = require("../auth.js");

// User registration
module.exports.userRegistration = (req, res) => {
	let input = req.body;
	User.findOne({email: input.email})
	.then(result => {
		// Check if email already exists
		if(result !== null){
			return res.send("Email already exists!");
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
			.then(save => res.send("You are now registered!"))
			.catch(error => res.send(error));
		}
	})
	.catch(error => res.send(error));
};

// User authentication (Login)
module.exports.userAuthentication = (request, response) => {
	let input = request.body;
	User.findOne({email: input.email})
	.then(result => {
		// Check if email is already registered
		if(result === null){
			return response.send("Email not registered!")
		}
		// Check if password is correct
		else{
			const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)
			if(isPasswordCorrect){
				// Returns the created access token
				return response.send({auth: auth.createAccessToken(result)});
			}
			else{
				return response.send("Wrong password");
			}
		}
	})
	.catch(error => response.send(error));
};

// User details
module.exports.userDetails = (request, response) => {
	// Retrieve payload
	const userData = auth.decode(request.headers.authorization);
	User.findById(userData._id)
	.then(result => {
		result.password = "hidden";
		return response.send(result);
	})
};