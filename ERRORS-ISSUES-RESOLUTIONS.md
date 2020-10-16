
**ERROR:** Cannot GET /<br>
**ISSUE:** that route doesn't exist <br>
**RESOLUTION:** create the route as it doesn't exist

**ERROR:**: Cannot GET /stocks/10<br>
**ISSUE:** that route doesn't exist <br>
**RESOLUTION:** that route deosn't exist on the server<br>



**ERROR:** POST - req.body {}<br>
**ISSUE #1:**  you didn't include the proper middleware<br>
```js
app.use(express.urlencoded({extended:false}))<br>
app.use(express.json())<br>
```
**RESOLUTION:**  #1 : pick a middle and use it<br>
**ISSUE  #2:** you place the route before the middleware<br>
**RESOLUTION  #2:**  place the middleware above routes<br>

**ERROR:** ReferenceError: Cannot access 'express' before initialization<br>
**ISSUE:** Express has not been defined before it's been called<br>
**RESOLUTION:** put quotes around express in require<br>

**ERROR:** ReferenceError: fruits is not defined<br>
**ISSUE:**  the fruits variable has not be created<br>
**RESOLUTION:** import fruits.js into server.js<br>

**ERROR:** [nodemon] app crashed - waiting for file changes before starting...<br>
**ISSUE:**  your making edits and nodemon is restarting before they are complete<br>
**RESOLUTION:** your edits aren't yet complete or they were bad edits<br>

**ERROR:** Cannot set headers after they are sent to the client<br>
**ISSUE:**  you are calling res.() more than once in the route<br>
**RESOLUTION:** you can only call res.json/res.send one time...the server can only respond once to the clients request<br>


