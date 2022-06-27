// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Personal API Key for OpenWeatherMap API

const keyAPI= "&appid=c43718a933f937a52014793e829faf82&units=imperial";
const baseURL =`api.openweathermap.org/data/2.5/weather?zip=`;
const server="https://localhost:8000";

// Event listener to add function to existing HTML DOM element
let generate = document.getElementById('generate'); // selectig the generate button
generate.addEventListener('click',generation) //event listener goes on at a click to call a function generation

/* Function called by event listener */
function generation(){
    //selecting zip and feelings user input
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getData(zip).then((data) => {
        //making sure if there is data
        if (data !== undefined && data !== null) {
            //using destructuring to take only the data we need
          const {
            main: {temp},
            name: city,
            weather: [{main}],
          } = data;
          //making my own object
          const weatherInfo = {
            newDate,
            city,
            temp: Math.round(temp),
            main,
            feelings
        };
        //posting the object on the server
        postData("/add", weatherInfo);
        //updating the UI to show the appropriate information
        updateUI(weatherInfo);
     }
})
}

/* Function to GET Web API Data*/

let getData = async(zip)=>{
    try{
    fetchURL="https://"+baseURL+zip+keyAPI;
    //fetching the API
    const response = await fetch(fetchURL);
    //converting the fetched data into json
    const data = await response.json();
    //making sure it works
    console.log('Done!');
    //returning the json object
    return data;
    } 
catch (errMsg) {
    console.log("Error: " + errMsg);
  }
} 

/* Function to POST data */

const postData= async(url="", dataObject={})=>{
    try{
        //posting dataObject with new info
    const response = await fetch(url,{
      headers: {
        "Content-Type": "application/json",
      },
        method: "POST",
        credentials:"same-origin",
        body: JSON.stringify(dataObject)
      });
      //making sure the posting process has happened
      console.log("Posted!");
      return response;
      } catch (error) { // if there is an error it will display
        console.log("error:" + error);
      }
}

/* Updating The UI */
const updateUI = async () => {
    //fetching all the info I need
    const response = await fetch("/all");
    try {
      const myData= await response.json();
      //updating the UI
      document.getElementById("date").innerHTML = myData.newDate;
      document.getElementById("city").innerHTML = myData.city;
      document.getElementById("temp").innerHTML = myData.temp + '&degC';
      document.getElementById("description").innerHTML = myData.main;
      document.getElementById("feeling").innerHTML = myData.feelings;

    } catch (error) {
      console.log("error: "+error);
    }
  };
