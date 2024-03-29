const mongoose = require("mongoose");
const User = require("../Models/userSchema.js");
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
		User.findById(userData._id)
		.then(user => {
			Product.findById(productId)
			.then(product => {
				let newOrder = new Order({
					userId: userData._id,
					firstName: user.firstName,
					lastName: user.lastName,
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
		})
		.catch(error => res.send(error))
	}
};

// Retrieve all orders (Admin only)
module.exports.allOrders = (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin === false){
		return res.send("Access denied. Not an admin.")
	}
	else{
		Order.find({})
		.then(result => res.send(result))
		.catch(error => res.send(error))
	}
};

// Retrieve authenticated user's orders
module.exports.userOrders = (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	const userId = req.params.userId;
	Order.find({userId: userId})
	.then(result => {
		if(userId === userData._id){
			if(result.length === 0){
				return res.send("You have no orders yet.")
			}
			else{
				return res.send(result)
			}
		}
		else if(userData.isAdmin === true){
			if(result.length === 0){
				return res.send("User has no orders yet.")
			}
			else{
				return res.send(result)
			}
		}
		else{
			return res.send("Acess denied")
		}
	})
	.catch(error => res.send(error))
};