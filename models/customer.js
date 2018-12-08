// Import modules
const mongoose = require('mongoose'); // MongoDB mongoose
const timestamp = require('mongoose-timestamp'); // mongoose-timestamp

// Create customer schema
const Customer_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

// Generate a timestamp
Customer_Schema.plugin(timestamp);

// Create a Customer model from schema and then export 
const Customer = mongoose.model('Customer', Customer_Schema);
module.exports = Customer;