const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	cover: {
		type: String,
		required: [true, "Product cover photo is required"]
	},
	images: {
		type: Array,
		required: [true, "Product image/s is/are required"]
	},
	name: {
		type: String,
		required: [true, "Product name is required"]
	},
	description: {
		type: String,
		required: [true, "Product description is required"]
	},
	stock: {
		type: Number,
		required: [true, "Product stock is required"]
	},
	price: {
		type: Number,
		required: [true, "Product price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: String,
		default: new Date().toLocaleString("en-US", {timeZone: "Asia/Manila"})
	}
});

module.exports = mongoose.model("Product", productSchema);