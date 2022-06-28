// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Personal API Key for OpenWeatherMap API
const keyAPI= "&appid=c43718a933f937a52014793e829faf82&units=imperial";
const baseURL =`api.openweathermap.org/data/2.5/weather?zip=`;

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
    console.log(data);
    //returning the json object
    return data;
    } 
catch (errMsg) {
    console.log("Error: " + errMsg);
  }
} 

/* Function to POST data */
const post = async(url="",data={})=>{
  const response = await fetch(url,{
    method : 'POST',
    mode: 'cors',
    credentials:'same-origin',
    headers : {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
  try{
    const theData = await response.json();
    return theData;
  }
  catch(error){
    console.log(error);
  }
}

/* Updating The UI */
const updateUI = async () => {
    //fetching all the info I need
    const response = await fetch("/all");
    try {
      const myData= await response.json();
      console.log(myData);
      //selecting the elements!
      let date=document.getElementById("date");
      let city=document.getElementById("city");
      let temp=document.getElementById("temp");
      let description=document.getElementById("description");
      let feeling=document.getElementById("feeling");
      //Putting info into UI elements usin text.content
      date.textContent = "Date: "+myData.newDate;
      city.textContent = "City: "+myData.city;
      temp.textContent = "Temperature: "+myData.temperature;
      description.textContent ="Description: "+ myData.description;
      feeling.textContent = "How you feel: "+myData.feelingsInput;

    } catch (error) {
      console.log("error: "+error);
    }
  };

  // Event listener to add function to existing HTML DOM element
let generate = document.getElementById('generate'); // selecting the generate button
generate.addEventListener('click',()=> {                      //selecting zip and feelings user input
let zipNumber = document.getElementById('zip').value;
let feelingsInput = document.getElementById('feelings').value;
getData(zipNumber).then((data) => {
  console.log(data);
      //making my own object
      let city = data.name;
      let temperature = Math.round(data.main.temp);
      let description = data.weather[0].description;
      const weatherInfo = {
        newDate,
        city,
        temperature,
        description,
        feelingsInput
    };
    //posting the object on the server
    console.log(weatherInfo);
    post("http://localhost:3000/add", weatherInfo).then((data)=>{
      //updating the UI to show the appropriate information
      updateUI(data);
    })
    
})})
