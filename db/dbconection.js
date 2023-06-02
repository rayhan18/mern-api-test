const mongoose = require('mongoose');

module.exports.dbConnection = async()=>{
    try{
   await mongoose.connect('mongodb://127.0.0.1:27017/test',{
    useNewUrlParser: true
   })
    }catch(err) {
        console.log(err)
    } 
}



//  mongoose.connect('mongodb://127.0.0.1:27017/test',{
//  useNewUrlParser: true
// }).then(()=>{
//     console.log('database connection successfully');
// }).catch(err =>console.error(err));

