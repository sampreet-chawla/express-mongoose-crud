// require('dotenv`) imports the library
// .config() will look for a file called .env and load the env variable
require('dotenv').config()
// import express
// Express is both a library and a framework that we’re using to create/configure our webserver
const express = require('express')
// import morgan
// morgan is an npm package that we’re using as an express middleware logger
const logger = require('morgan')
// import our fruits "model"/array
// const fruits = require('./models/fruits.js')
// instantiate a new instance of express
const app = express()
// set our port to use whats been defined in .env OR 3000
const PORT = process.env.PORT 
// this is our mock database
// app.use is a way to setup packages to sit in the middle of the
//  req => (some middleware software) => res cycle

// the middleware must be place before the routes
// is a way to setup packages to sit in the middle of the “request => (some middleware) => response” cycle

// app.use((req, res, next) => {
// 	console.log('im joes super duper middleware')
// 	next()
// })
app.use(logger('dev'));
//x-www.form-urlencoded
app.use(express.urlencoded({extended:false}))
// accepts raw json
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        status:200,
        msg: 'you have hit the default route...nothing to see here'
    })
})

// import the fruits controller
const fruitsController = require('./controllers/fruits.js')
// this middleware will forward all request to /fruits to 
// the fruitsController
app.use('/fruits', fruitsController)

// configure server to listen on the PORT
app.listen(PORT, () => {
    console.log(`listening in on port: ${PORT}`)
})
// as per our configuration we can start the server via:
// npm run dev
// npm start
// nodemon

/*
ERROR: Cannot GET /
ISSUE: that route doesn't exist
RESOLUTION: create the route..or don't go it

ERROR: ReferenceError: fruits is not defined
ISSUE: the fruits variable has not be created
RESOLUTION: import fruits.js into server.js

ERROR: POST - req.body {}
ISSUE #1: you didn't include the proper middleware
	app.use(express.urlencoded({extended:false}))
	app.use(express.json())
RESOLUTION #1 : pick a middle and use it
ISSUE #2: you place the route before the middler
RESOLUTION #2: reorder the middleware above routes
*/