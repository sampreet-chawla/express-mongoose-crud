// IMPORT THE DB CONNECTION
const mongoose = require('./connection');
// IMPORT THE TWEET MODEL
const Fruits = require('../models/fruit');
// IMPORT THE FruitsS JSON DATA
const manyFruits = require('./seedData.json');
// CREATE THE DB CONNECTION
const db = mongoose.connection;
// CREATE ALL Fruits USING .THEN()
Fruits.deleteMany({}).then(() => {
	Fruits.insertMany(manyFruits).then((fruits) => {
		console.log('fruits', fruits);
		db.close();
	});
});
