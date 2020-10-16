const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
	name: { type: String, required: true },
	fruits: [{ ref: 'Fruits', type: Schema.Types.ObjectId }],
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
