require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: false }));

// controllers
const fruitsController = require('./controllers/fruits');
app.use('/fruits', fruitsController);

// listen
app.listen(port, () => {
    console.log(`the fruits app is listening on port ${port}`);
});