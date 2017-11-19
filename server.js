//require dotenv module for enviromental variable to be readable
require('dotenv').config({ silent: true });

// require our dependencies for the application
const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      ExpressValidator = require('express-validator'),
      expressJWT  = require('express-jwt'),
      jwt         = require('jsonwebtoken');


//instantiate app
const app = express();


//use or middleware modules
//for logging outputs to dev server
app.use(logger('dev'));
//for parsing json objects
app.use(bodyParser.json())
//for parsing urls
app.use(bodyParser.urlencoded({ extended: false }))
//to allow cors ... cross site requests
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next();
})
//to validate user inputs
app.use(ExpressValidator())
app.use(expressJWT({secret: process.env.SECRET}).unless({path: ['/users/login', '/users/signup', '/auth']}));

//routing middlewares
app.use('/users', require('./routes/users'))
app.use('/api', require('./routes/api'))

//error handling middleware
app.use((err, req, res, next)=>{
    if (err.name === 'UnauthorizedError'){
        res.status(401).send(err);
    }
    else {
      console.error(err.stack)
      next(err);
    }
})

//set port to env variable for production or 3000 for development
const Port = process.env.PORT || 3005




app.listen(Port, (req,res)=>{
  console.log(`app is very much in good health and running on port ${Port}`)
})
