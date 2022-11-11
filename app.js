require('dotenv').config()
const nodemon =require('nodemon')
const express = require('express')
const hbs = require('hbs')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express();

const { PORT } = process.env;
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use(express.static('./public')); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 


app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/drivers', (req,res)=>{
    let config = {
        method: 'get',
        url: 'https://v1.formula-1.api-sports.io/drivers',
        headers: {
          'x-rapidapi-key': 'eadc164ca7c36b540c39625b8e3f2384',
          'x-rapidapi-host': 'v1.formula-1.api-sports.io'
        }
      };
      axios(config)
      .then((response) => {
        console.log(response.data);
        res.render('drivers')
      })
      .catch(function (error) {
        console.log(error);
      });
    
})

let statsDiff = [{}];

app.get('/search', (req,res)=>{
  let driver1, driver2;
  console.log(req.query)
  axios.get(`https://v1.formula-1.api-sports.io/drivers?search=${req.query.driver1}`, {headers: {'x-rapidapi-key': 'eadc164ca7c36b540c39625b8e3f2384','x-rapidapi-host': 'v1.formula-1.api-sports.io'}})
  .then((data) => {
    return driver1 = data.data.response
  })
  .then ((driver1)=>{
    axios.get(`https://v1.formula-1.api-sports.io/drivers?search=${req.query.driver2}`, {headers: {'x-rapidapi-key': 'eadc164ca7c36b540c39625b8e3f2384','x-rapidapi-host': 'v1.formula-1.api-sports.io'}})
  .then((data)=>{
    driver2 = data.data.response
    let driver1Points = parseInt(driver1[0].career_points)
    let driver2Points = parseInt(driver2[0].career_points)
    statsDiff[0].points =  driver1Points - driver2Points
    statsDiff[0].grands_prix_entered =  driver1[0].grands_prix_entered - driver2[0].grands_prix_entered
    statsDiff[0].podiums = driver1[0].podiums - driver2[0].podiums
    statsDiff[0].championships = driver1[0].world_championships - driver2[0].world_championships
    

    driver1[0].podium_percentage = ((driver1[0].podiums/driver1[0].grands_prix_entered)*100).toFixed(2)
    driver2[0].podium_percentage = ((driver2[0].podiums/driver2[0].grands_prix_entered)*100).toFixed(2)
    statsDiff[0].percentage = (((driver1[0].podium_percentage - driver2[0].podium_percentage)/driver2[0].podium_percentage)*100).toFixed(2)

    //if (statsDiff[0].points >=0){
    //  window.getElementById('stats-dom').style.color = "green"
    //}
    //if (statsDiff[0].points <=0){
    //  window.getElementById('stats-dom').style.color = "red"
    //} 
    //console.log(driver1)
    //console.log(driver2)
    res.render('driver', {driver1, driver2, statsDiff})
  })
  })   
})

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))
