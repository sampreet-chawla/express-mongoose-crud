// CONNECTION TO THE DATABASE
const mongoose = require('../db/connection');
// IMPORT THE SCHEMA CLASS
const Schema = mongoose.Schema;
// INSTANTIATE A NEW INSTANCE OF THE SCHEMA CLASS
const fruitSchema = new Schema(
	{
		name: { type: String, required: true },
		color: { type: String, required: true },
		readyToEat: { type: Boolean, default: false },
	}
);
// CREATE THE MODEL AND ASSOCIATE IT WITH A SCHEMA
const Fruit = mongoose.model('Fruit', fruitSchema);
// EXPORT THE MODEL
module.exports = Fruit;
