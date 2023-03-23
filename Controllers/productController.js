const mongoose = require("mongoose");
const Product = require("../Models/productSchema.js");
const auth = require("../auth.js");

// Create product (Admin only)
async function addProduct(req, res) {
	const userData = auth.decode(req.headers.authorization);
	let input = req.body;
	let productName = await Product.findOne({name: input.name});
	let newProduct = new Product({
		cover: input.cover,
		images: input.images,
		name: input.name,
		description: input.description,
		stock: input.stock,
		price: input.price
	});
	try {
		if(!userData.isAdmin) {
			return res.send("Access denied. Not an admin.");
		} else if(productName !== null) {
			return res.send("This product already exists!")
		} else {
			await newProduct.save();
			return res.send(newProduct);
		}
	} catch(err) {
		return res.send(err);
	}
};

module.exports.addProduct = addProduct;

// Retrieve all products (Admin only)
async function allProducts(req, res) {
	const userData = auth.decode(req.headers.authorization);
	try {
		let products = await Product.find({});
		return res.send(userData.isAdmin? products : "Access denied. Not an admin");
	} catch(err) {
		return res.send(err);
	}
};

module.exports.allProducts = allProducts;

// Retrieve all active products
async function allActive(req, res) {
	try {
		let activeProducts = await Product.find({isActive: true});
		return res.send(activeProducts);
	} catch(err) {
		return res.send(err)
	}
};

module.exports.allActive = allActive;

// Retrieve single product
async function productDetails(req, res) {
	const productId = req.params.productId;
	try {
		let product = await Product.findById(productId);
		return res.send(product);
	} catch(err) {
		return res.send(err);
	}
};

module.exports.productDetails = productDetails;

// Update product information (Admin only)
async function updateProduct(req, res) {
	const productId = req.params.productId;
	const userData = auth.decode(req.headers.authorization);
	let input = req.body;
	let updatedProduct = {
		cover: input.cover,
		images: input.images,
		name: input.name,
		description: input.description,
		stock: input.stock,
		price: input.price
	};
	try {
		await Product.findByIdAndUpdate(productId, updatedProduct, {new: true});
		return res.send(userData.isAdmin? "Product details updated!" : "Access denied. Not an admin.");
	} catch(err) {
		return res.send(err);
	}
};

module.exports.updateProduct = updateProduct;

// Archive product (Admin only)
async function archiveProduct(req, res) {
	const productId = req.params.productId;
	const userData = auth.decode(req.headers.authorization);
	let input = req.body;
	let archivedProduct = {
		isActive: input.isActive
	};
	try {
		await Product.findByIdAndUpdate(productId, archivedProduct, {new: true});
		return res.send(userData.isAdmin? "Product status updated!" : "Access denied. Not an admin.");
	} catch(err) {
		return res.send(err);
	}
};

module.exports.archiveProduct = archiveProduct;