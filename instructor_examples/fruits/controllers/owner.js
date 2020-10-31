// import express
const express = require('express');
// instantiate a new instance of express.Router
const router = express.Router();
// import the db connection
const mongoose = require('../db/connection');
// import the Fruit model
const Owner = require('../models/owner');
const Fruit = require('../models/fruit')

router.get('/', async (req,res) => {
    const owner = await Owner.find({}).populate('fruits')
    res.json({status: 200, data: owner})
})

router.post('/', async (req, res) => {
    console.log('owner-post', req.body)
    const owner = await Owner.create(req.body)
    res.json({ status: 200, data: owner})
})

// ownerId: 5f89fea7c6a6780d4074852b - sara
// fruitId: 5f89ec2a6188f001527d2fed - apple
router.put('/:ownerId/addFruits/:fruitId', async (req,res) => {
    console.log('owner - put', req.params)
    const fruit = await Fruit.findById(req.params.fruitId)
    const owner = await Owner.findByIdAndUpdate(
            req.params.ownerId,
            { $push: {fruits: fruit.id}, new: true }
    )
    res.json({status: 200, data: owner})
})



// export router
module.exports = router
