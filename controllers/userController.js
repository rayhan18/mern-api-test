
const User = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')


const  addUserController = async (req,res)=>{
  const errors = validationResult(req)
  if(errors.isEmpty()) {
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
const user = await User.findOne({email})
if(!user) return res.status(400).send('unable to find user')
//chack password
const isMatched = bcrypt.compare(password, user.password)
if(!isMatched) return res.status(400).send('unable to match password')
 // generate token
 const token = user.generateAuthToken()
  //console.log('token',token)
 //send as header  
 res.header('X-Auth-Token', token)
 //res.append("name", user.name)
 //send as cookie
//  res.cookie('auth-token', token,{
//   httpOnly: true,
//   sameSite: true,
//   signed: true,
//   maxAge: 4 * 60 * 60 * 1000
 //})
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

// .animate-charcter {
//   text-fill-color: transparent;
//   -webkit-text-fill-color: transparent;
//   -webkit-animation: textclip 2s linear infinite;
//   animation: textclip 2s linear infinite;
//   background-clip: initial;
//   background-clip: text;
//   -webkit-background-clip: text;
//   background-image: linear-gradient(-225deg,#02f70e,#fbfcfb 29%,#dafadd 67%,#03fa39);
//   background-size: initial;
//   background-size: 200% auto;
//   color: #fff;
//   display: inline-block;
//   font-size: 60px;
//   font-weight: 700;
//   text-transform: uppercase;