// import express
const express = require('express')
// instantiate a new instance of express.Router
const router = express.Router()
// import the db connection
const mongoose = require('../db/connection')
// import the Fruit model
const Fruit = require('../models/fruit')
// create the db connection
const db = mongoose.connection


// index - returns all things
router.get('/', (req, res) => {
    Fruit.find({})
        .then((allFruits) =>
			res.json({
				status: 200,
				data: allFruits
			})
        ).catch( err => console.log('err', err))
        // .finally(() => db.close())
})

// show - returns a single thing
router.get('/:id', (req, res) => {
   Fruit.findById(req.params.id)
    .then( fruit => res.json({
			status: 200,
			data: fruit
	}))
})

// create - create a single thing
router.post('/', (req, res) => {
    const fruit = req.body
    fruits.push(fruit)
    res.json({
        status: 200,
        msg: 'data received'
    })
})

// delete - remove a single thing
router.delete('/:index', (req, res) => {
    fruits.splice(req.params.index, 1)
     res.json({
        status: 200,
        msg: 'item deleted',
	 });
})

// put - update a single thing
router.put('/:index', (req, res) => {
    fruits[req.params.index] = req.body
     res.json({
        status: 200,
        msg: 'item update',
        fruit: fruits[req.params.index],
    });
})

// export router
module.exports = router