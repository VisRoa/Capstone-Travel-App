import "babel-polyfill";
import fetch from "node-fetch";

//import "@babel/polyfill";


//selecting the submit button which will be added to it an EventListener when clicked -- did not use it here
const submit = document.querySelector(".submit");

let geolatlong = {};
 
var lat,lng;
var picture ;
var weathTemp ;

async function handleSubmit(event){
  event.preventDefault();

 
  let geocallsURL = 'http://localhost:8091/geo'
  let tempCallsURL= 'http://localhost:8091/getTemp';
  let picCallsUrl = 'http://localhost:8091/getPicture'

  //selecting the data entered by the user the city and the date 
  const cityIN = document.querySelector(".CityInput").value;
  const dateIN = document.querySelector(".DateInput").value;
  console.log(`data entered in the form are City: ${cityIN},, date: ${dateIN}`)


  //check the input entered  
  checkInput(dateIN,cityIN)
  console.log("----- submitted the form ----")

   
    //storing the lat&lng inside the geolatlong which I declared it 
   //in the global scope so I can reach it in the second fetch weather 

   console.log("postGeo working....")
   await postGeo(geocallsURL,{city: cityIN});

    // check what the geolatlong hold after implementing the function postGeo
   console.log("geo hold",geolatlong)
        
  console.log("getWeather working...")

   // implement the second call to get the weather result and pass the data to weathTemp
   await GetWeather(tempCallsURL,geolatlong)

     //print the result from weathTemp
   console.log("weathTemp hold", weathTemp)

   //implement the 3rd call to get the picture based on the city input
   //  by saving the result of the pic in a global varaible > picture

  const PIXAbayBaseURL = 'https://pixabay.com/api/?key'
  const pixa_Key ='19594215-625d8235694c673d57651ff8f'
  const featu = 'city&image_type=photo'
  // const oldAPI = `${PIXAbayBaseURL}=${pixa_Key}&q=${cityIN}&${featu}`
  const validAPI =`https://pixabay.com/api/?key=19594215-625d8235694c673d57651ff8f&q=${cityIN}&category=places&image_type=photo`
  const ress = await fetch(validAPI)
  const xx = await ress.json();
   picture =  xx.hits[0].webformatURL;
       
       console.log("the DynamicUI ..")

           /*
        .then(function(){
           DynamicUI();
          })
          
          */

         DynamicUI();
         
  
 } // end of formHandler


 
 // function to check the input entered by the user 
 function checkInput (date, city){

       // get the current date and check if the entered date is less than it 
        // if its less show an alert
        var varDate = new Date(date); //will be in the format dd-mm-YYYY
        var today = new Date();
        today.setHours(0,0,0,0);
        if(varDate > today) {
            return true
        } else{
          alert ("enter a correct date")
          return false;
        }
 }

 
  
// post geonames function that in return will pass the lat & lng > geolatlong 
 const postGeo = async (url= "", data= {}) => {
    console.log('data from postGeo: ',data)
    const response = await fetch (url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
        const newData = await response.json();
   
        lat = newData.geonames[0].lat;
        lng = newData.geonames[0].lng;
        console.log("lat is ",lat)
        geolatlong = {lat,lng}
        console.log("from the /geo post...")
        // geolatlong will be passed to the following API call
        console.log(`geolatlong hold ${geolatlong}`)
        console.log("the newData:", newData)
        console.log(newData.geonames[0].lat,newData.geonames[0].lng)

       //return geolatlong;
 };

 
 let gatherData = {}
 gatherData.geolatlong = geolatlong.lat;
 gatherData.geolatlong = geolatlong.lng;

 
 const GetWeather = async (url, weath) => {
    console.log('data from postWeather: ',weath)
    const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(weath)
  });
    const newData = await response.json();
    // this array will be used to invoke the data from it so I store the returend data from API here
    weathTemp= {
      /*
     high_temp:newData.data[0].high_temp ,
     low_temp: newData.data[0].low_temp,
     description: newData.data[0].weather.description,
     Tempicon: newData.data[0].weather.icon
     */
      temp :newData.data[0].temp,
      Tempicon: newData.data[0].weather.icon

    }
    console.log("weathTemp.temp ..", weathTemp.temp)
    
    console.log("from the GetWeather function...")
     console.log("the weather Data:", newData)
     console.log('test the high temp and description')
     //console.log(newData.data[0].high_temp,newData.data[0].weather.description)
     console.log("test the weathTemp from GetWeather,,",weathTemp)
     //return newData;


}; 

  // update the UI by adding HTml code to the user_request section 
  // since I declared all the results that came from APIs globaly so I will access each one from its direct name 
  function DynamicUI(){
  const citydynamic = document.querySelector(".CityInput").value;
  const datedynamic = document.querySelector(".DateInput").value;
  const update = document.querySelector(".content");


  update.innerHTML = `
   

          <div>
            <h1> Your Trip Information</h1>
          </div>

          <div>
          <img class="image" src="${picture}"/>
          <h1>The City To Travel To : </h1>
          <h2 class="color_txt"> ${citydynamic} </h2>
          <h1>The Date To travel at :  </h1>
          <h2 class="color_txt"> ${datedynamic} </h2>
          <h1>The Expected  Temperature Will be:  </h1>
          <h2 class="color_txt"> ${weathTemp.temp}°</h2>
    
          <img src="../images/${weathTemp.Tempicon}.png">
          </div> 
          <button class="deleteONclick" onclick=Client.removeTrip()>Delete</button>
      `;

      /**
       * 
       *    <h1>The Expected Low Temperature Will be:  </h1>
          <h2 class="color_txt">${weathTemp.low_temp}° </h2>
          <h1>The Description of Temperature:  </h1><h2 class="color_txt"> ${weathTemp.description} </h2>
       */

      /*
      document.querySelector(".res").innerHTML=`<img class="image" src="${pic}"/>`;
      document.querySelector(".city_to").innerHTML= `> ${citydynamic}`;
      document.querySelector(".date_to").innerHTML=`> ${datedynamic}`;
      document.querySelector(".high_temp").innerHTML=`> ${weathTemp.high_temp}`;
      document.querySelector(".low_temp").innerHTML= `> ${weathTemp.low_temp}`;
      document.querySelector(".descreption_temp").innerHTML=`> ${weathTemp.description}<img src="../images/${weathTemp.Tempicon}.png"> `
*/
 }


// implement the remove feature of the entered City
// remove the main div that hold all the results and then reload the page 
function removeTrip() {

  document.querySelector(".user_request").remove();
  window.location.reload();
  
}






export { handleSubmit }
export { checkInput };
export { DynamicUI };
export { removeTrip };
export { postGeo };
export { GetWeather };