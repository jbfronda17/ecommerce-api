const mongoose = require("mongoose");
const Product = require("../Models/productSchema.js");
const Order = require("../Models/orderSchema.js");
const auth = require("../auth.js");

// Non-admin user checkout (Create order)
module.exports.createOrder = (req, res) => {
	let input = req.body;
	const productId = req.params.productId;
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin === true){
		return res.send("For users only.")
	}
	else{
		Product.findById(productId)
		.then(product => {
			let newOrder = new Order({
				userId: userData._id,
				username: input.username,
				productId: productId,
				cover: product.cover,
				name: product.name,
				description: product.description,
				quantity: input.quantity,
				price: product.price,
				subtotal: input.quantity * product.price,
			})
			newOrder.save()
			.then(order => res.send(order))
			.catch(error => res.send(error))
		})
		.catch(error => res.send(error))
	}
};