const mongoose = require('./connection');
const Fruits = require('../models/fruit');
const fruitsData = require('./seedData.json');
const { db } = require('../models/fruit');

Fruits.deleteMany({})
	.then(() => {
		Fruits.insertMany(fruitsData)
			.then((data) => console.log('Loaded fruits: ', data))
			.catch((error) => console.log('Error loading fruits', error))
			.finally(() => db.close());
	})
	.catch((error) => console.log('Error deleting previous fruits', error));
