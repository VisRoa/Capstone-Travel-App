//import "babel-polyfill";
//const polyfill = require ("@babel/polyfill");
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');
const app = express();
let Data = {}; 

//middleware 
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static('dist'));
console.log(__dirname);



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    
})


 
  



app.listen(8091, function () {
    console.log('Example app listening on port 8091!')
})


// get coordinates = lat & long from geoname API
//const geonamesBaseURL = 'http://api.geonames.org/searchJSON?maxRows=1&q='
const geoBaseURL = 'http://api.geonames.org/searchJSON?q';
const geonamesuserName = 'roaama'


const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const WeatherpersonalKey = '3e7657bcd9834139be24bcee1698135b'







//  the 3 routes > 1- to get lat & long from geonames 
//                  > 2- get weather by using the lat & long
//                  > 3- the picture of the entered city from pixabay will be from client side 


//******************************** post Route ******************************* */
app.post('/geo',geopost);

app.post('/getTemp',postTemp);




//*****           get weather route     *********** */

// function that implement the geonames API 
async function geopost(req,res){

    const geoBaseURL = 'http://api.geonames.org/searchJSON?q';
    const geonamesuserName = 'roaama'
    let city = req.body.city;
    let maxRows = 'maxRows=1&username'
    const GeoURL = `${geoBaseURL}=${city}&${maxRows}=${geonamesuserName}`;

    const response = await fetch(GeoURL)
    const geoData = await response.json()
    console.log("data from server /geo")
    console.log(geoData)
    res.send(geoData);

}


            // function to implement the weather call API 
async function postTemp (request,response ){

     lat = request.body.lat;
     lon = request.body.lng;

      //weatherbitBaseURL check the url 
     // https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.89511&lon=-77.03637&key=3e7657bcd9834139be24bcee1698135b

     let tempURL =`${weatherbitBaseURL}&lat=${lat}&lon=${lon}&key=${WeatherpersonalKey}`
     const Tempresponse = await fetch(tempURL)
     const weatherTemp = await Tempresponse.json();
     console.log("weather from server postTemp() ")
     console.log(weatherTemp)
     response.send(weatherTemp); 

}



module.exports= { app }