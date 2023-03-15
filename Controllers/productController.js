const mongoose = require("mongoose");
const Product = require("../Models/productSchema.js");
const auth = require("../auth.js");

// Create product (Admin only)
module.exports.addProduct = (request, response) => {
	let input = request.body;
	const userData = auth.decode(request.headers.authorization);
	if(userData.isAdmin === false){
		return response.send("Access denied. Not an admin.")
	}
	else{
		Product.findOne({name: input.name})
		.then(result => {
			if(result !== null){
				return response.send("This product already exists!")
			}
			else{
				let newProduct = new Product({
					image: input.image,
					name: input.name,
					description: input.description,
					stock: input.stock,
					price: input.price
				})
				newProduct.save()
				.then(product => response.send(product))
				.catch(error => response.send(error));
			}
		})
		.catch(error => response.send(error));
	}
};

// Retrieve all products (Admin only)
module.exports.allProducts = (request, response) => {
	const userData = auth.decode(request.headers.authorization);
	if(userData.isAdmin === false){
		return response.send("Access denied. Not an admin")
	}
	else{
		Product.find({})
		.then(result => response.send(result))
		.catch(error => response.send(error))
	}
};