const UserRouter = require('express').Router()


UserRouter.route('/')
  .get((req,res,next)=>{
    res.send('works')
  })



module.exports = UserRouter
