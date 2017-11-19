const UserRouter = require('express').Router()
const UserModel = require('../models/users')

UserRouter.route('/')
  .get((req,res,next)=>{
    res.send('works')
  })

UserRouter.route('/signup')
  .post(UserModel.createUser,(req,res,next)=>{
    res.status(200).json(res.id)
  })



module.exports = UserRouter
