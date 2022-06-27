// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app =express();
/* Middleware*/
const  bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('weather'));
// setting the port number
const port = 3000;

// Spin up the server
const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`)
})

// Callback function to complete GET '/all'
const getAllData=function (req, res){
    res.send(projectData);
    }
//Callback function to POST
  const postAdd= function (req,res){
    res.send('POST received');
    projectData = req.body;
  };
// Get Route
app.get('/all', getAllData);

// Post Route
app.post('/add',postAdd );

