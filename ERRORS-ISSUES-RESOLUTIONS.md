
**ERROR:** Cannot GET /<br>
**ISSUE:** that route doesn't exist <br>
**RESOLUTION:** create the route as it doesn't exist

**ERROR:** ReferenceError: fruits is not defined<br>
**ISSUE:**  the fruits variable has not be created<br>
**RESOLUTION:** import fruits.js into server.js<br>

**ERROR:** POST - req.body {}<br>
**ISSUE #1:**  you didn't include the proper middleware<br>
```js
	app.use(express.urlencoded({extended:false}))<br>
	app.use(express.json())<br>
```
**RESOLUTION:**  #1 : pick a middle and use it<br>
**ISSUE  #2:** you place the route before the middleware<br>
**RESOLUTION  #2:**  place the middleware above routes<br>
