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
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    res.render('drivers')
})

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))
