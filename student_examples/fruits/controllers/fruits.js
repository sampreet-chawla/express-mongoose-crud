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
	fruits.push(fruit);
	res.json({
		status: 200,
		msg: 'data received',
	});
});

// delete - remove a single thing
router.delete('/:index', (req, res) => {
	fruits.splice(req.params.index, 1);
	res.json({
		status: 200,
		msg: 'item deleted',
	});
});

// put - update a single thing
router.put('/:index', (req, res) => {
	fruits[req.params.index] = req.body;
	res.json({
		status: 200,
		msg: 'item update',
		fruit: fruits[req.params.index],
	});
});

// export router
module.exports = router;
