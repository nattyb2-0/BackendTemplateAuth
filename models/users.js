//require to connect to db
const db = require('../db/connections')

//modules to hash password
var bcrypt = require('bcrypt');
const SALT = 10;

//module to create json web token
const jwt = require('jsonwebtoken');

//require to validate user input
const ExpressValidator = require('express-validator');


module.exports ={

 createUser: (req,res,next)=>{
  //expressvalidator functions to check user input
    req.checkBody('username', 'Username cannot be empty!').notEmpty()
    req.checkBody('username', 'Username must be between 4 - 15 characters').len(4,15)
    req.checkBody('email', 'Email is invalid! check again!').isEmail()
    req.checkBody('email', 'email must be between 4 - 100 characters').len(4,100)
    req.checkBody('password', 'password must be between 8 - 100 characters').len(4,100)
    req.checkBody('password', 'password must include one lower case, 1 uppercase, and number, and a special character')
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

     req.checkBody('passwordMatch', 'password must be between 8 - 100 characters').len(4,100)
     req.checkBody('passwordMatch', 'password does not match. try again!!').equals(req.body.password)

    //check if there are errors and if so send them as json response
    const errors = req.validationErrors()
     if(errors){
        console.log(` error: ${JSON.stringify(errors)}`)
        res.status(404).json(errors)
      }//else continue to create user and add user into database
       else{
        let user= new Object;
         user.name = req.body.username;
         user.password = user.password=bcrypt.hashSync(req.body.password, SALT);
         user.email = req.body.email

        db.none(`INSERT INTO users (username, email,password) VALUES ($1, $2, $3)`,
            [user.name, user.email, user.password])
          .then( (results) => {
           console.log('user created!')
           res.id = results
           next()
        })
        .catch(error => console.log(error))
      }

},
  authenticate: (req, res, next)=> {
    req.checkBody('username', 'Username cannot be empty!').notEmpty()
    req.checkBody('username', 'Username must be between 4 - 15 characters').len(4,15)
    req.checkBody('password', 'password must be between 8 - 100 characters').len(4,100)
    req.checkBody('password', 'password must include one lower case, 1 uppercase, and number, and a special character')
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

    const errors = req.validationErrors()
     if(errors){
        console.log(` error: ${JSON.stringify(errors)}`)
        res.status(404).json(errors)
      }
      else{
        let user= new Object;
         user.name = req.body.username;
         user.password = req.body.password;
         console.log(req.body.password)
        db.one(`SELECT * FROM users WHERE username = $1;`,[user.name] )
          .then((data) => {
            console.log(data.password)
            const match = bcrypt.compareSync(user.password, data.password);
            if (match) {
              const myToken = jwt.sign({username: user.username}, process.env.SECRET, { expiresIn: 129600 });
              res.token = myToken;
              next()
            }
            else {
              res.status(500).send('fuck u fite me irl');
            }
        })
        .catch(error => next(error))
      }
  }
}

