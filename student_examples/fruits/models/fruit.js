const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const FruitsSchema = new Schema(
	{
		name: { type: String, required: true },
		color: { type: String, required: true },
		readyToEat: { type: Boolean, required: false },
	},
	{ timestamps: true }
);

const Fruits = mongoose.model('Fruits', FruitsSchema);

module.exports = Fruits;
