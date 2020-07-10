const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruits.js');


// router.get('/seed', (req, res) => {
//     Fruit.insertMany([
//         {
//             name: 'grapefruit',
//             color: 'pink',
//             readyToEat: true
//         },
//         {
//             name: 'grape',
//             color: 'purple',
//             readyToEat: false
//         },
//         {
//             name: 'avocado',
//             color: 'green',
//             readyToEat: true
//         }
//     ], (err, data) => {
//         if (err) console.log(error)
//         else res.send(data);
//     })
// });

// index
router.get('/', (req, res) => {
    Fruit.find({}, (err, allFruits) => {
        if (err) console.log(err)
        else res.send(allFruits)
    })
});

//show
router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if (err) console.log(err)
        else res.send(foundFruit)
    })
});

// // create
router.post('/', (req, res) => {
    // get data from the user / client
    if (req.body.readyToEat === "true") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.send(createdFruit);
    });
});


// delete
router.delete('/:id', (req, res) => {
    Fruit.deleteMany(req.params.id, (err, deletedFruit) => {
        if (err) console.log(err)
        else res.send(deletedFruit)
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
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
        if (err) console.log(err)
        else res.send(updatedFruit)
    })
});



module.exports = router;
