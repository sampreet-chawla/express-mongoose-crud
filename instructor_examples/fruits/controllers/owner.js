// import express
const express = require('express');
// instantiate a new instance of express.Router
const router = express.Router();
// import the db connection
const mongoose = require('../db/connection');
// import the Fruit model
const Owner = require('../models/owner');

router.post('/', async (req, res) => {
    console.log('owner-post', req.body)
    const owner = await Owner.create(req.body)
    res.json({ status: 200, data: owner})
})

// export router
module.exports = router
