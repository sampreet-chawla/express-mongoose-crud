# :apple: :grapes: :banana:
# Fruits App Pt 2 - Express and Mongoose CRUD

## Lesson Objectives

1. Connect Express to Mongo
1. Create Fruits Model
1. Have Create Route Create data in MongoDB
1. Have Index Route Render All Fruits from mongo
1. Have Show Route Show 1 fruit in mongo
1. Have Delete Route Delete in mongo
1. Have Update Route Update data in mongo


## Lets go back to your fruits express app!
In `student_examples` you will have a copy of the fruits app we started creating thigs week.

Today, we will be adding Mongoose to our app, so that we can make our fruit data persist!


## Connect Express to Mongo

1. `npm i mongoose`

Whenever we are developing a website or application, we always wanted practice a separation of concerns. 

When we separated out our files into a `models` and `controllers` directory we were separating the various functionality of our application into folders that specify what they do. 

Lets take our mongoose connection and place it in a folder called db.

1. Create a `db` directory
1. Create a `connection.js` file

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/basiccrud',  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  }, () => console.log("connection established to mongod"));


module.exports = mongoose;
```

We will return a mongoose variable that is connected to our database;

## Create Fruits Model

1. Delete the contents currently inside of `models/fruits.js`
1. Create the fruit schema

```javascript
// We will use the connected mongoose variable we export from the connection.js file! Isnt that nice!
const mongoose = require('../db/connection.js');

const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;
```

## Have Create Route Create data in MongoDB

Inside server.js:

```javascript
// Replace the variable fruit with Fruit to show that is a model
const Fruit = require('../models/fruits.js');
//... and then farther down the file
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

```

## Update the Index Route to get data from Mongo

```javascript
router.get('/', (req, res) => {
    Fruit.find({}, (err, allFruits) => {
        if (err) console.log(err)
        else res.send(allFruits)
    })
});
```

<hr>

### 1. Test Post Route with Postman
<img src="https://miro.medium.com/max/516/1*MP7BSXKJrQzCz_aI2zJr-g.png" width="300px" >

- Open up a new tab in postman
- Set your type of request
- Set the correct request url
- Add content to the Body tab
- Make sure you are using `x-www-form-urlencoded`

### 2. Test the Index Route in your Browser or in Postman

<hr>


## Update the Show Route to get data from Mongo

```javascript
router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if (err) console.log(err)
        else res.send(foundFruit)
    })
});
```


## Update the Delete Route to delete data in Mongo

```javascript
router.delete('/:id', (req, res) => {
    Fruit.deleteMany(req.params.id, (err, deletedFruit) => {
        if (err) console.log(err)
        else res.send(deletedFruit)
    })
});
```

<hr>

### 1. Test Post Route with Postman
<img src="https://miro.medium.com/max/516/1*MP7BSXKJrQzCz_aI2zJr-g.png" width="300px" >

- Open up a new tab in postman
- Set your type of request
- Set the correct request url

<hr>

## Update the Update Route to update data in mongo

```javascript
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
```
<hr>

### 1. Test Post Route with Postman
<img src="https://miro.medium.com/max/516/1*MP7BSXKJrQzCz_aI2zJr-g.png" width="300px" >

- Open up a new tab in postman
- Set your type of request
- Set the correct request url
- Add content to the Body tab
- Make sure you are using `x-www-form-urlencoded`


<hr>

## That was fun!! Let's review what we have learned so far!

- What does express do?
- What does mongodb do?
- What does mongoose do?
- What does node do?

<hr>

## :fork_and_knife:  One more thing!
When you create an api, you often want to add a lot of data to test your api, routes etc.

Instead of adding each record in postman its convetional to add a seed route.

For us, it might look something like this:


```javascript
router.get('/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.send(data);
    })
});
```

To be even more efficient, we can put this data in a `seedData.js` file or json file. 

Then we can import this file and use it to create our seed data!

Lets try using a `json` file:


```json
[
    {
        "name": "apple",
        "color":  "red" ,
        "readyToEat": "true"
    },
    {
        "name": "pear" ,
        "color":  "green" ,
        "readyToEat": "false"
    },
    {
        "name": "banana" ,
        "color":  "yellow" ,
        "readyToEat": true
    }
]
```

Then in your controller import and update your seed route


```js
const seedData = require('../db/seedData.json');

// seed
router.get('/seed', (req, res) => {
    Fruit.insertMany(seedData, (err, fruit) => {
        if (err) console.log(err)
        else res.send(fruit)
    })
});

```