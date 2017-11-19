const ApiRouter = require('express').Router()


ApiRouter.route('/')
  .get((req,res,next)=>{
    res.send(' api works')
  })



module.exports = ApiRouter
