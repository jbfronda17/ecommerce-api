const mongoose = require("mongoose");
const Product = require("../Models/productSchema.js");
const auth = require("../auth.js");

// Create product (Admin only)
module.exports.addProduct = (req, res) => {
	let input = req.body;
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin === false){
		return res.send("Access denied. Not an admin.")
	}
	else{
		Product.findOne({name: input.name})
		.then(result => {
			if(result !== null){
				return res.send("This product already exists!")
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
				.then(product => res.send(product))
				.catch(error => res.send(error));
			}
		})
		.catch(error => res.send(error));
	}
};

// Retrieve all products (Admin only)
module.exports.allProducts = (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin === false){
		return res.send("Access denied. Not an admin")
	}
	else{
		Product.find({})
		.then(result => res.send(result))
		.catch(error => res.send(error))
	}
};

// Retrieve all active products
module.exports.allActive = (req, res) => {
	Product.find({isActive: true})
	.then(result => res.send(result))
	.catch(error => res.send(error))
};

// Retrieve single product
module.exports.productDetails = (req, res) => {
	const productId = req.params.productId;
	Product.findById(productId)
	.then(result => res.send(result))
	.catch(error => res.send(error))
};