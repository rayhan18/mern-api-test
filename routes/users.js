const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const {getUsersController,addUserController} = require('../controllers/userController')

router.get('/', getUsersController);

router.post('/',
[
    check('firstName', 'first name is required' ).notEmpty(),
    check('lastName', 'last name is required' ).notEmpty(),
    check('email', ' Email is required' ).notEmpty(),
    check('email', ' Email is required' ).isEmail(),
    check('password', 'password is required' ).notEmpty(),
    check('password', 'password must be 6 characters long ' ).isLength({min:6}),
    check('confirmPassword', 'confirm Password  is required' ).notEmpty(),
    check('confirmPassword').custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('confirm password does not match');
        }else{
            return true;
        }
    })
],
 addUserController)



module.exports = router;