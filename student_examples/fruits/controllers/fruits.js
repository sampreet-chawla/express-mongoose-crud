const express = require('express');
const router = express.Router();
const fruits = require('../models/fruits');

// index
router.get('/', (req, res) => {
    res.send(fruits);
});

//show
router.get('/:id', (req, res) => {
    res.send(fruits[req.params.id]);
});

// // create
router.post('/', (req, res) => {
    // get data from the user / client
    if (req.body.readyToEat === "true") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    const newData = req.body;
    fruits.push(newData);
    res.send(newData);
});

// delete
router.delete('/:id', (req, res) => {
    const deletedFruit = fruits.splice(req.params.id, 1);
    res.send(deletedFruit);
});

// update
router.put('/:id', (req, res) => {
    // get data from the user / client
    if (req.body.readyToEat === "true") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    fruits[req.params.id] = req.body;
    res.send(req.body);
});




module.exports = router;
