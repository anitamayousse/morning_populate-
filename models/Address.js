const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	streetName: String,
	streetNumber: String,
    postCode: String,
    city: String,
});

const Address = mongoose.model("Address", UserSchema);

module.exports = Address;