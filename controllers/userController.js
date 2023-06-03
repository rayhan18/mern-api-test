
const User = require('../models/user')
const {validationResult} = require('express-validator')

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





const getUsersController =(req,res)=>{
 res.send('all users')
}
module.exports = {
    addUserController,
    getUsersController
}