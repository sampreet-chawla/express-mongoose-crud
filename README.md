# Express and Mongoose CRUD

## Lesson Objectives

1. Connect Express to Mongo
1. Create Fruits Model
1. Have Create Route Create data in MongoDB
1. Have Index Route Render All Fruits from mongo
1. Have Show Route Show 1 fruit in mongo
1. Have Delete Route Delete in mongo
1. Have Update Route Update data in mongo
1. Create a second Model
1. Create a controller for our second Model
1. Created data using Related Models

## Let's go back to your fruits express app!

In `student_examples` you will have a copy of the fruits app we started creating earlier this week.

Today, we will be adding Mongoose to our app so that we can make our fruit data persist!

## Routing Table

Here is our routing table to help guide us along the way

| **URL**     | **HTTP Verb** | **Action** | **Description**             |
| ----------- | ------------- | -------------- | ---------------------- |
| /fruits     | GET           |    index            | get all fruits         |
| /fruits     | POST          |    create            | create a new fruit     |
| /fruits/:id | GET           |    show            | get a single fruit     |
| /fruits/:id | PUT           |    update            | update a single fruit  |
| /fruits/:id | DELETE        |    destroy            | destroy a single fruit |

## Connect Express to Mongo

Our previous version of the `Fruits` server is only using an array of data to simulate a database. Now it's time for to upgrade the server to include a backend database.

<hr>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 15min

Install Mongoose and seed some initial entries.

Here is what you will need to do:

- install mongoose
- setup the connection file to the `fruits` collection
- create a `Schema` and `Model` - `Fruit`
- setup the `seed.js` file to seed the DB based on the `seedDdata.json` file
- add startup script to seed the database

Here is the how you should configure the `Schema`

| **Key**    | **Type** | **Required** | **Defaults** |
| ---------- | -------- | ------------ | ------------ |
| name       | String   | yes          | no           |
| color      | String   | yes          | no           |
| readyToEat | Boolean  | no           | false        |

<hr>

## Updating The Controller and Routes

Inside the `fruit.js` controller file we will be updating the routes to use the DB instead of the previous array of data.

This means that we need to do the following:

- import the db connection
- import the Fruit model
- create the db connection in order to close the connection

### Initial Setup

Let's perform those imports and setup.

```js
const mongoose = require('../db/connection');
const Fruit = require('../models/Fruit');
const db = mongoose.connection;
```

### Index Route

Now we update the `index` route to return all fruits.

```javascript
// index - returns all things
router.get('/', (req, res) => {
    Fruit.find({})
        .then((allFruits) =>
			res.json({
				status: 200,
				data: allFruits
			})
        ).catch( err => console.log('err', err))
})
```

### Test Route Using Postman

- Open up a new tab in postman
- Set your type of request to GET
- Set the correct request url

## Show Route

Now we update the `show` route

```javascript
router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id)
        .then((fruit) => res.json({ status: 200, data: fruit }))
		.catch((err) => console.log(err))
});
```

### Test Route Using Postman

- Open up a new tab in postman
- Set your type of request to GET
- Set the correct request url

### Create Route

Now we update the `create` route

```javascript
router.post('/', (req, res) => {
    Fruit.create(req.body)
        .then((fruit) => res.json({ status: 200, data: fruit }) )
		.catch((err) => console.log(err))
		.finally(() => { db.close()});
});
```

### Test Route Using Postman

- Open up a new tab in postman
- Set your type of request to POST
- Set the correct request url
- Add content to the Body tab
- Make sure you are using `x-www-form-urlencoded`

## Delete Route

Now we update the `delete` route

```javascript
router.delete('/:id', (req, res) => {
    Fruit.findByIdAndDelete(req.params.id)
       .then((fruit) => res.json({ status: 200, data: fruit }) )
	   .catch((err) => console.log(err))
});
```

### Test Route Using Postman

- Open up a new tab in postman
- Set your type of request to DELETE
- Set the correct request url

## Update Route

```javascript
router.put('/:id', (req, res) => {
	Fruit.findByIdAndUpdate( req.params.id, req.body,{ new: true })
        .then((fruit) => res.json({ status: 200  data: fruit }) )
		.catch((err) => console.log(err))
	);
});
```

<hr>

### Test Route Using Postman

- Open up a new tab in postman
- Set your type of request to PUT
- Set the correct request url
- Add content to the Body tab
- Make sure you are using `x-www-form-urlencoded`

<hr>

## Review

In order to prepare you for the full day mock interviews we have planned in unit 4 take a moment to think about and answer the following questions:

The instructor will provide the questions :question: :question:  :question: :question: 

<!--
- :question: Describe what MVC is and how have you used it to structure a web server?.
- :question: How is Mongo used to support a servers database needs?.
- :question: How is Mongoose used to support the Mongo Database in a Node/Express app?.
- :question: How do you expect to pull the data from the server in React?  -->

<hr>

## Creating A Seed Route

When you create an api, you often want to add a lot of data to test your api, routes etc.

Besides adding a `db:seed` startup script we can also create a `seed` route.

For us, it might look something like this:

```javascript
router.get('/seed', async (req, res) => {});
```

Now we can update the route to include the mongoose commands to delete all previous entries and insert the new records.

This time let's use `async/await`.

```js
const seedData = require('../db/seedData.json');

// seed
router.get('/seed', async (req, res) => {
    await Fruit.deleteMany({})
    const fruits = await  Fruit.insertMany(seedData)
    res.json({ status: 200, data: fruits }))
})
```

<hr>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 15min

Since `async/await` looks like cleaner code refactor all the routes to use `async/await` 

<hr>

## Related Models

We aren't finished just yet!

What if we decide that we want a fruit to have an owner. In order to do this, we will need to have another model.

We will call this other model `Owner`.

Since we are creating an entirely new `model`, we will also create a `controller` for this `model`. This will make it easy to find and access all endpoints for this resource.

### Let's start by creating the `Owner` model.

We want our owner to have a name field that is required and have an array of fruits!

In your `owner.js` model file first import the db connection

```js
const mongoose = require('../db/connection');
```

Now create the `Schema`. In order to build the relationship between the 2 models we need the fruits array to reference a fruit that we have created using the `Fruit` model. This requires the followingn:

- `mongoose.Schema.Types.ObjectId` is going to allow us to reference another resource using the resources `id`.
- `ref` will reference the model we are looking to nest within our other model.

```js
{
    ref: "Fruit",
    type: mongoose.Schema.Types.ObjectId
}
```

Let's put it all together.

```js
const ownerSchmea = new mongoose.Schema({
	name: { type: String, required: true },
	fruits: [
		{
			ref: 'Fruit',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

const Owner = mongoose.model('Owner', ownerSchmea);

module.exports = Owner;
```

<hr>

## The Owner controller

In the `controllers` folder create the `owner.js` controller file.

### Create Owner

Start by creating your Create/Post route for an owner.

```js
router.post('/', (req, res) => {
	Owner.create({ name: req.body.ownerName }, (err, owner) => {
		if (err) console.log(err);
		else res.send(owner);
	});
});
```

Import the controller in your server.js file and setup up middleware to direct all `/owner` requests to the controller.

```js
// controllers
const ownerController = require('./controllers/owners');
app.use('/owners', ownerController);
```

### Update Owner

Next, create an Update/Put route for the Owner. When we update the Owner we want to push new fruits to its array.

To do this we need the following info:

- both the ID of the User we are looking for and the ID of the Fruit we are looking to push to the Owner model

#### Import Fruits Model Into Owner Controller

```js
const Fruit = require('../models/fruits');
```

Create the route

```js
router.put('/:ownerId/addFruits/:id', (req, res) => {});
```

Find the Fruit so we can use it's ID.

```js
router.put('/:ownerId/addFruits/:id', (req, res) => {
	Fruit.findById(req.params.id, (err, fruit) => {
		if (err) {
			console.log(err);
		} else {
			console.log('fruit.id', fruit.id);
		}
	});
});
```

Now query for the `Owner` and push the fruit into the array of fruits.

```js
router.put('/:ownerId/addFruits/:id', (req, res) => {
	Fruit.findById(req.params.id, (err, fruit) => {
		if (err) console.log(err);
		else {
			console.log('fruit.id', fruit.id);
			Owner.findByIdAndUpdate(
				req.params.ownerId,
				{
					$push: {
						fruits: fruit.id,
					},
				},
				(err, owner) => {
					if (err) console.log(err);
					else res.send(owner);
				}
			);
		}
	});
});
```

<hr>

## Index route for all Owners that show their nested Fruits

To pull the related fruit data when we query for the owner we will use the `populate()` method.

```js
router.get('/', async (req, res) => {
	const data = await Owner.find({}).populate('fruits');
	res.json({
		status: 200,
		data: data,
	});
});
```

### References

- [Populate() Method](https://mongoosejs.com/docs/populate.html)
