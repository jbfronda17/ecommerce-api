const jwt = require("jsonwebtoken");
const secret = "EcommerceAPI";

// Token Creation
module.exports.createAccessToken = (user) => {
	// payload
	const data = {
		_id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
	// generate a JSON web token
	return jwt.sign(data, secret, {});
};

// Token verification
module.exports.verify = (request, response, next) => {
	// The token is retrieved from the "request headers"
	let token = request.headers.authorization;
	// Token received is not undefined
	if(typeof token !== "undefined"){
		// Retrieves the token only and removes the "Bearer" prefix
		token = token.slice(7, token.length);
		// Validate and decrypt the token using the secret code
		return jwt.verify(token, secret, (error, data) => {
			// If jwt is not valid
			if(error){
				return response.send({auth: "Failed."});
			}
			// Proceed to the function that invokes the controller function
			else{
				next();
			}
		})
	}
	// Token does not exist (undefined)
	else{
		return response.send({auth: "Failed."});
	}
};

// Token decryption
module.exports.decode = (token) => {
	// Token received is not undefined
	if(typeof token !== "undefined"){
		// Retrieves the token only and removes the "Bearer" prefix
		token = token.slice(7, token.length);
		// Validate and decrypt the token using the secret code
		return jwt.verify(token, secret, (error, data) => {
			// If jwt is not valid
			if(error){
				return null;
			}
			else{
				// Obtain information from the JWT
				// Returns an object with access to the "payload"
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	}
	// Token does not exist (undefined)
	else{
		return null;
	}
};