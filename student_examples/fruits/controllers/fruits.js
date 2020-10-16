// import express
const express = require('express');
// instantiate a new instance of express.Router
const router = express.Router();
// import the 'fruits' seed data
//const fruits = require('../db/seedData.js.js')

const mongoose = require('../db/connection');
const Fruits = require('../models/fruit');
const Fruit = require('../models/fruit');
const db = mongoose.connection;

// index - returns all things
router.get('/', (req, res) => {
	Fruit.find({})
		.then((allFruits) => {
			res.json({
				status: 200,
				data: allFruits,
			});
		})
		.catch((error) => {
			console.log('Error getting data:', error);
			res.json({ status: 500, msg: `Error getting data: ${error}` });
		});
	// .finally(() => db.close());
});

// show - returns a single thing
router.get('/:id', (req, res) => {
	Fruits.findById({ _id: req.params.id })
		.then((data) => {
			res.json({
				status: 200,
				fruit: data,
			});
		})
		.catch((error) => {
			console.log('Error getting data:', error);
			res.json({ status: 500, msg: `Error getting data: ${error}` });
		});
});

// create - create a single thing
router.post('/', (req, res) => {
	const fruit = req.body;
	Fruit.create(fruit)
		.then((data) => {
			res.json({
				status: 200,
				data: data,
			});
		})
		.catch((error) => {
			console.log('Error getting data:', error);
			res.json({ status: 500, msg: `Error creating data: ${error}` });
		});
});

// delete - remove a single thing
router.delete('/:id', (req, res) => {
	Fruit.findByIdAndDelete({ _id: req.params.id })
		.then((data) => {
			res.json({
				status: 200,
				msg: 'item deleted',
			});
		})
		.catch((error) => {
			console.log('Error getting data:', error);
			res.json({ status: 500, msg: `Error deleting data: ${error}` });
		});
});

// put - update a single thing
router.put('/:id', (req, res) => {
	Fruit.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((data) => {
			res.json({
				status: 200,
				msg: 'item update',
				fruit: data,
			});
		})
		.catch((error) => {
			console.log('Error getting data:', error);
			res.json({ status: 500, msg: `Error updating data: ${error}` });
		});
});

// export router
module.exports = router;
