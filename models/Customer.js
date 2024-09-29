const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/hw_db";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

const customerSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    postal: {type: Number, required: true},
    created_by: {type: String, required: true}
})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;