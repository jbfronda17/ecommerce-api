const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

// MongoDB connection
mongoose.set("strictQuery", true)
mongoose.connect(`${process.env.MONGODB_URI}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;

// For validation of the connection
db.once("open", () => console.log("Database connected successfully!"));

// For error handling
db.on("error", console.error.bind(console, "Connection Error!"));

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});