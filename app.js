require('dotenv').config()
const express = require('express')
const hbs = require('hbs')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express();

const { PORT } = process.env;

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public'))); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 


app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))
