const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log("connection established to mongod"));


module.exports = mongoose;