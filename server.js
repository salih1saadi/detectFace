const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

 const db = knex ({
  client: 'pg',
  connection: {
    host : 'ec2-23-21-13-88.compute-1.amazonaws.com',
    user : 'dydhskyglyikti',
    password : '765681a4a795da2b2c1bbf7c4705a305cae94be4075867359d726145fa0fffd5',
    database : 'dd9lssq7nt8hrb'
  }
});



const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get('/',(req, res)=>{

res.send('it is working');


})


app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req, res, db)})

app.put('/image',(req,res) => {image.handleImage(req, res, db)})
app.post('/imageUrl',(req,res) => {image.handleApiCall(req, res)})




app.listen(process.env.PORT || 3000, ()=>{

console.log(`app is run ${process.env.PORT}`);
})