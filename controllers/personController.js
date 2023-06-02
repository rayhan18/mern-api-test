
const Person = require('../models/persons');
const {check ,validationResult} = require('express-validator');

const addPersonController = async(req,res)  => {
   
        const errors = validationResult(req.body)
        if(!errors.isEmpty()){
     return res.status(400).send(errors.array());
        } 
         
         try{
             const person = new Person(req.body)
             await person.save()
             res.send(person)
         }catch(err){
             res.status(500).send('server error');
         }
        
         //console.log(person)
     }
     //single person
     const findSingelController = async(req,res)=>{
            //error handling validation
            const errors = validationResult(req.body)
            if(!errors.isEmpty()){
         return res.status(400).send(errors.array());
            } 
            try{
                const id = req.params.id
                const note =  await Person.findById(id)
                if(!note) return res.status(404).send('not found');
                res.send(note)
            }catch(err){
               res.status(500).send(err.message)
            }
            
          
        }
     
//get All Person
const getAllPersonController =async(req,res)=>{

    
        try{
            const persons = await  Person.find()
            res.status(200).send(persons);
        }catch(err){
            res.status(500).send(err.message);
        }
      
        
    }


    //update Person
const updatePersonController = async (req,res) => {

    const id = req.params.pid
    const personInput = Object.keys(req.body);
    const allowedUpdate = ['title', 'description', ];
    const isAllowed = personInput.every(update => allowedUpdate.includes(update));
    
    if(!isAllowed) return res.status(400).send('not allowed');
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array());
    }
    try{
        const person =await Person.findByIdAndUpdate(id, req.body,{
            new:true,
            runValidators: true
        })
        if(!person)return res.status(400).send('not fount')
        res.send(person)
    }catch(err){
        res.status(500).send(err.message)
    }
  
 }

 //delete Person
 const deletePersonController = async(req,res) => {
    

const id = req.params.peid;
const errors = validationResult(req)
if(!errors.isEmpty()) return res.status(404).send('not fount')
try{
    const person = await Person.findByIdAndDelete(id)
    if(!person){return res.status(404).send('not fount')}
    res.send(person)

}catch(err){
    res.status(500).send(err.message)
}

}





module.exports = {
    addPersonController,
    findSingelController,
    getAllPersonController,
    updatePersonController,
    deletePersonController
}