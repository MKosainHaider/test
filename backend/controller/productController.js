//product controller
// Create a Mongoose schema for an e-commerce platform that includes embedded documents for product reviews and a sub-schema for user information. The schema should enforce validation for the following:

// Product: name, description, price, stock quantity

// Reviews: user (embedded), rating (1-5), comment, date

// User sub-schema: first name, last name, email, hashed password, and role

//productController

const mongoose = require('mongoose');

const Product = require('../models/productModel');
const Review = require('../models/reviewModel');

exports.getProducts = async (req, res) => {
    const products = await mongoose.get()
        .then(products => products.map())
        .catch(err => {})
        return products
}

