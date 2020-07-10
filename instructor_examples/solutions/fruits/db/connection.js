const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// export connection mongoose variable
module.exports = mongoose;