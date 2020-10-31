// IMPORT MONGOOSE
const mongoose = require('mongoose');
// CONNECTION URI
const mongoURI = 'mongodb://localhost:27017/fruits';
// CONFIG PARAMS
const config = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
};
// CONNECT TO THE DATABASE/URI
mongoose.connect(mongoURI, config);
// CREATE A CONNECTION
const db = mongoose.connection;
// ADDITIONAL MESSAGE CONNECTIONS
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));
// EXPORT MONGOOSE
module.exports = mongoose;
