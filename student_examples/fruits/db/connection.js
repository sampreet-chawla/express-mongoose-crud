const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/fruits';
const config = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect(mongoURI, config);
const db = mongoose.connection;

db.on('error', (error) => console.log('Error connecting: ', mongoURI));
db.on('connected', () => console.log('DB connected: ', mongoURI));
db.on('disconnected', () => console.log('DB disconnected.'));

//db.close();

module.exports = mongoose;
