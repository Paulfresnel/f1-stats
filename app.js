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
    console.log(driver1)
    console.log(driver2)
    res.render('driver', {driver1, driver2})
  })
  })   
})

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))
