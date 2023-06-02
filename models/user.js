const mongoose = require('mongoose');
const validator = require('validator');


const  userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
     lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        validate:{
            validator(value){
                return validator.isEmail(value)
            },
            message: 'Please enter valid email address'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validate:{
            validator(value){
                return value.toLowercase().includes('password');
            },
            message: 'Please enter a valid  password'
        }
    }
});

const  User = mongoose.model('User', userSchema);
module.exports = User;