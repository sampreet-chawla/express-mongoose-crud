const mongoose = require('../db/connection');

const ownerSchmea = new mongoose.Schema({
    name: { type: String, required: true },
    fruits: [
        {
            ref: "Fruit",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
});

const Owner = mongoose.model('Owner', ownerSchmea);

module.exports = Owner;