const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	firstName: String,
	surName: String,
	addresses: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
});

const Student = mongoose.model("Student", UserSchema);

module.exports = Student;