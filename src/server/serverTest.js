var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

//middleware 
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('dist'));
console.log(__dirname);


app.get("/test", function (request, response) {
    response.status(200).send("ok");
  });
  
module.exports = app;