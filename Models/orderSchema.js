const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "User Id is required"]
	},
	firstName: {
		type: String,
		required: [true, "First Name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"]
	},
	productId: {
		type: String,
		required: [true, "Product Id is required"]
	},
	cover: {
		type: String,
		required: [true, "Product cover photo is required"]
	},
	name: {
		type: String,
		required: [true, "Product name is required"]
	},
	description: {
		type: String,
		required: [true, "Product description is required"]
	},
	quantity: {
		type: Number,
		required: [true, "Quantity is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	subtotal: {
		type: Number,
		required: [true, "Subtotal is required"]
	},
	purchasedOn: {
		type: String,
		default: new Date().toLocaleString("en-US", {timeZone: "Asia/Manila"})
	}
});

module.exports = mongoose.model("Order", orderSchema);