const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/userSchema.js");
const auth = require("../auth.js");

// User registration
async function userRegistration(req, res) {
	let input = req.body;
	try {
		const userEmail = await User.findOne({email: input.email});
		const userMobile = await User.findOne({mobile: input.mobile});
		// Check if email already exists
		if(userEmail !== null) {
			return res.send("This email is already in use!");
		// Check if mobile number already exists
		} else if(userMobile !== null) {
			return res.send("This mobile number is already in use!")
		} else {
			// Create a new user
			let newUser = new User({
				firstName: input.firstName,
				lastName: input.lastName,
				email: input.email,
				mobile: input.mobile,
				password: bcrypt.hashSync(input.password, 10)
			});
			await newUser.save();
			return res.send(newUser);
		}	
	} catch(err) {
		return res.send(err);
	}
};

module.exports.userRegistration = userRegistration;

// User authentication (Login)
async function userAuthentication(req, res) {
	let input = req.body;
	try {
		const user = await User.findOne({email: input.email});
		// Check if email is already registered
		if(user === null) {
			return res.send("This email is not yet registered, please register first!");
		} else {
			// Check if password is correct
			const isPasswordCorrect = bcrypt.compareSync(input.password, user.password);
			return isPasswordCorrect? res.send({auth: auth.createAccessToken(user)}) : res.send("Wrong password, please try again!");
		}
	} catch(err) {
		return res.send(err)
	}
};

module.exports.userAuthentication = userAuthentication;

// User details
async function userDetails(req, res) {
	const userData = auth.decode(req.headers.authorization);
	try {
		const user = await User.findById(userData._id);
		user.password = "hidden";
		return res.send(user);
	} catch(err) {
		return res.send(err);
	}
};

module.exports.userDetails = userDetails;