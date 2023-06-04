
const User = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')


const  addUserController = async (req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    res.status(400).send(errors.array())
  }

  const user = new User(req.body)
  try{
  const foundUser =  await User.findOne({email: req.body.email})
    if(foundUser) return res.status(400).send('user Already registered ')
    await user.save()
    res.send(user)
  }catch(err){
    res.status(500).send(err.message)
  }
  
}





const getUsersController = async (req,res)=>{
  try{
    const users = await User.find({} ,'-password')
    res.status(200).send(users)
  }catch(err){
    res.status(500).send(err.message)
  }
 
}

const getSingleUserController = async (req,res)=>{
  const id = req.params.id
  try{
    const user = await User.findById(id ,'-password')
    if(!user) return res.status(404).send('User not found')
    res.send(user)
  }catch(err){
    res.status(500).send(err.message)
  }
  
  
}

const loginUserController = async (req,res)=>{
  const {email,password} = req.body
  try{
//chack email
const user = await User.findOne({email, password})
if(!user) return res.status(400).send('unable to find user')
//chack password
const isMatched = bcrypt.compare(password,user.password)
if(!isMatched) return res.status(400).send('unable to match password')
 // generate token
 const token = user.generateToken()
 //send as header  
 res.header('X-Auth-Token', token)
 //send as cookie
//  res.cookie('auth-token', token,{
//   httpOnly: true,
//   sameSite: true,
//   signed: true,
//   maxAge: 4 * 60 * 60 * 1000
//  })
 // console.log(token)
res.send('success')
  }catch(err){
    res.status(500).send(err.message)
  } 
}

module.exports = {
    addUserController,
    getUsersController,
    getSingleUserController,
    loginUserController
}