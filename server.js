// require our dependencies for the application
const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path');


//instantiate app
const app = express();


//use or middleware modules
//for logging outputs to dev server
app.use(logger('dev'));
//for parsing json objects
app.use(bodyParser.json())
//for parsing urls
app.use(bodyParser.urlencoded({ extended: false }))



//error handling middleware
app.use((err, req, res, next)=>{
    if (err.name === 'UnauthorizedError')
        res.status(401).send(err);
    }
    else {
        next(err);
    }
)

//set port to env variable for production or 3000 for development
const Port = process.env.PORT || 3005




app.listen(Port, (req,res)=>{
  console.log(`app is very much in good health and running on port ${Port}`)
})
