//require to connect to db
const db = require('../db/connections')

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
         user.password = req.body.password;
         user.email = req.body.email

        db.none(`INSERT INTO users (username, email,password) VALUES ($1, $2, $3); returning id`,
            [user.name, user.email, user.password])
          .then( (results) => {
           console.log('user created!')
           res.status(200).json(results)
           next()
        })
        .catch(error => console.log(error))
      }

}


}
