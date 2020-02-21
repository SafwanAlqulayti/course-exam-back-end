const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    username: {type: String , required:[true , 'cant be blank']},
    email: {type: String , required:true},
    password: {type: String , required:true},// after the user sign in hash the password
    role: String  , 
    img: String  ,
    major: String  ,
     

 

    courses:[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }]

})

const User = mongoose.model('User', userSchema) ;
module.exports = User ;