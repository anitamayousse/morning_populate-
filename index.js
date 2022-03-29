const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Models
const Student = require("./models/Student");
const Address = require("./models/Address");

// Middlewares
app.use(express.json());

// Connexion à MongoDB
mongoose
	.connect(
		"mongodb+srv://Anita:gtXSsxboyg5LMeQQ@cluster0.oppld.mongodb.net/morning_populate?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
		}
	)
	.then(() => {
		console.log("Connected to MongoDB");
	});

// Routes
//create student 
app.post("/students", async (req, res) => {
	await Student.create(req.body);

	res.status(201).send("Student created");
});
// get address by id
app.get("/:addressId", async (req, res) => {
	const address = await Address.findById(req.params.addressId);

	res.json(address);
});

app.get("/student/:studentId", async (req, res) => {
	const student = await Student.findById(req.params.studentId).populate("addresses");

	res.json(student);
});
// create address into student's array 
app.post("/student/:studentId/address", async (req, res) => {
	const address = await Address.create(req.body);
	await Student.findByIdAndUpdate(req.params.studentId, {
		$push: { addresses: address._id },
	})

	res.status(201).send("Address created");
});

app.get("/stats", async (req, res) => {
	const data = await User.aggregate([
		{
			$match: {
				age: { $gte: 20 },
			},
		},
		{
			$group: {
				_id: null,
				ageAverage: { $avg: "$age" },
				min: { $min: "$age" },
				max: { $max: "$age" },
			},
		},
	]);

	res.json(data);
});

// Start server
app.listen(8000, () => {
	console.log("Listening");
});

// Aggrégation
// join (récupérer des données de deux collections)
// count, group by, avg, max, ascendent, croissant (aggrégation)