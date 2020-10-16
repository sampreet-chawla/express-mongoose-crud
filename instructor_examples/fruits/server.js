require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const app = express()
const PORT = process.env.PORT 

app.use(logger('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        status:200,
        msg: 'you have hit the default route...nothing to see here'
    })
})

const fruitsController = require('./controllers/fruits.js')
app.use('/fruits', fruitsController)

const ownersController = require('./controllers/owner.js')
app.use('/owners', ownersController)

app.listen(PORT, () => {
    console.log(`listening in on port: ${PORT}`)
})
