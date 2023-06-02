const mongoose = require('mongoose');

const personSchema =new mongoose.Schema(
    {
        title:  String,
        description: String,
       
        
    },
    {
        timestamps: true
    }
    )

    const Person = mongoose.model('Person',personSchema);
    module.exports = Person;