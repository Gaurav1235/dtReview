require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an elasticsearch client
const dataController = require('./data.controller')
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});


const app = express()

const { PORT, CLIENT_ORIGIN, DB_URL} = require('./config')

// Only allow requests from our client
app.use(cors({
  origin: CLIENT_ORIGIN
}))
app.use(express.json())
app.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Allow the app to accept JSON on req.body

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/postData",dataController.postData);
app.delete("/deleteData",dataController.deleteData);
app.put("/updateData",dataController.updateData);
// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.
app.get('/search', function (req, res){
  // declare the query object to search elastic search and return only 200 results from the first result found.
  // also match any data where the name is like the query string sent in
  console.log(req.query['q']);
  let body = {
    size: 200,
    from: 0,
    query: {
      match: {
          name: req.query['q']
      }
    }
  }
  // perform the actual search passing in the index, the search query and the type
  client.search({index:'store',  body:body, type:'productslist'})
  .then(results => {
    console.log(".....");
    console.log(results.hits.hits);
    res.send(results.hits.hits);
  })
  .catch(err=>{
    console.log(err)
    res.send([]);
  });

})


// Catch all to handle all other requests that come into the app. 
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})

// To get rid of all those semi-annoying Mongoose deprecation warnings.
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}


//Connecting the database and then starting the app.
mongoose.connect(DB_URL, options);

app.listen(PORT, () => console.log('started ....'))
// The most likely reason connecting the database would error out is because 
// Mongo has not been started in a separate terminal.

