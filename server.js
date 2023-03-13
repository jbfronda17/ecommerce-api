const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");

// MongoDB connection
mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;

// For validation of the connection
db.once("open", () => console.log("Database connected successfully!"));

// For error handling
db.on("error", console.error.bind(console, "Connection Error!"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});