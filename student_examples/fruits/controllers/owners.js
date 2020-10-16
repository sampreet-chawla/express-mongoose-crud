const express = require('express');
const router = express.Router();

const mongoose = require('../db/connection');
const Owner = require('../models/owners');
const Fruit = require('../models/fruit');

router.get('/', async (req, res) => {
	try {
		const owner = await Owner.find({}).populate('fruits');
		res.json({
			status: 200,
			data: owner,
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			msg: error,
		});
	} finally {
		//db.close();
	}
});

router.post('/', async (req, res) => {
	try {
		const owner = await Owner.create(req.body);
		res.json({
			status: 200,
			data: owner,
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			msg: error,
		});
	} finally {
		//db.close();
	}
});

router.put('/:ownerId/addFruits/:fruitId', async (req, res) => {
	try {
		const fruit = await Fruit.findById(req.params.fruitId);
		const owner = await Owner.findByIdAndUpdate(
			req.params.ownerId,
			{ $push: { fruits: fruit.id } },
			{ new: true }
		);
		res.json({
			status: 200,
			data: owner,
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			msg: error,
		});
	} finally {
		//db.close();
	}
});

module.exports = router;
