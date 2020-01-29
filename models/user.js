const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    username: {type: String , required:[true , 'cant be blank']},
    email: {type: String , required:true},
    password: {type: String , required:true},// after the user sign in hash the password
    role: String  ,//take it from the form
 

    // courses:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course'
    //   }]

})

const User = mongoose.model('User', userSchema) ;
module.exports = User ;