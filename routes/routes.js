const express = require('express');
const route = express.Router()

const {check } = require('express-validator');
const {addPersonController,
    findSingelController,
    getAllPersonController,
    updatePersonController,
    deletePersonController } = require('../controllers/personController')

//get all person
route.get('/', getAllPersonController)

//singel person
route.get('/:id',
//check error
check('id','id not found').isMongoId(),
findSingelController
)

//add person
route.post('/',
//check validity
[
    check('title').notEmpty()
    //.isLength({min:3,max:10})
    .withMessage('title is required'),
    check('description').notEmpty()
    //.isLength({min:30,max:100})
    .withMessage('description is required'),
],
addPersonController
)

//update person
route.put('/:pid',
 [
    check('pid' ,'id not found').isMongoId(),
    check('title' , 'title is require').optional().notEmpty(),
    check('description', 'description is require').optional().notEmpty()
 ],
 updatePersonController
)


//delete person
route.delete('/:peid', 
check('peid', 'peid not valid').isMongoId(),
deletePersonController
)

module.exports = route ;