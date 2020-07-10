const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruits');
const Owner = require('../models/owner');
const seedData = require('../db/seedData.json');

// seed
router.get('/seed', (req, res) => {
    Fruit.insertMany(seedData, (err, fruit) => {
        if (err) console.log(err)
        else res.send(fruit)
    })
});

// index
router.get('/', async (req, res) => {
    const data = await Owner.find({}).populate('fruits');
    res.send(data);
});

//show
router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, fruit) => {
        if (err) console.log(err)
        else res.send(fruit)
    })
});

// create
router.post('/', (req, res) => {
    // get data from the user / client
    if (req.body.readyToEat === "true") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    const newData = req.body;
    Fruit.create(newData, (err, fruit) => {
        if (err) console.log(err)
        else {
            Owner.create({ name: req.body.ownerName, fruits: fruit.id }, (err, owner) => {
                res.send({ fruit, owner })
            })
        }
    })
});

// delete
router.delete('/:id', (req, res) => {
    Fruit.findByIdAndDelete(req.params.id, (err, deleted) => {
        res.send(deleted)
    })
});

// update
router.put('/:id', (req, res) => {
    // get data from the user / client
    if (req.body.readyToEat === "true") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updated) => {
        res.send(updated)
    })
});




module.exports = router;
