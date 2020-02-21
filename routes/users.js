const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

 
//create new user and hash the password
// router.post('/', async (req, res) => {
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password , 10) //10 for salt
//     User.create({username: req.body.username,
//     email: req.body.email,
//     password: hashedPassword
// }, (error, newUser) => {
//       res.json(newUser);
//     })
// }catch (err){
// res.json(err)
// }

//   })
router.post('/',(req,res)=>{// sign up
    console.log("post working")
    User.find({email: req.body.email} )
    .then(user=>{
        if(user.length  == 0){//true  , prevent email duplication
            const hashedPassword =  bcrypt.hash(req.body.password , 10) //10 for salt
            .then((hash)=> {console.log(hash)

                User.create({username: req.body.username,
                email: req.body.email,
                password: hash ,
                role: req.body.role ,
                teaching: req.body.teaching ,
                img: req.body.img
                
        }).then((newuser)=> {
            res.json({msg:"User has created" ,newuser})
            console.log("saved")
        })
    })
    }else{
        res.send("the email is exist")
    }
   
})
})


// check log in
router.post('/login',  async(req,res)=>{
     console.log("working")
    const user =  await User.findOne({username: req.body.username })
    if(user == null){
        res.status(400).send({msg: "The user cant be found"})

    }
    try{
// compere the hashed password  , hash the password and then compare
      if(await bcrypt.compare(req.body.password , user.password)){
          var userToken = {user}
          //to hide the user password
          userToken.user.password = ""
          
        //   console.log(userToken)
          let token = jwt.sign(userToken , "secret" ,{expiresIn: 1000})
        //   console.log(token)ç
          
          res.status(200).json({ token:token ,user})
       }else{
          res.send("not allowed")
      }
    }catch{
        res.status(500).send()
    }
   
   
})
//delete user

router.delete('/:id', async (req,res)=>{
    try{
    const removedUser = await User.findByIdAndRemove(req.params.id)
     res.json(removedUser)
    }catch (err){
      res.json({msg:err})
    }
  })
//   router.put('/:id', async (req,res)=>{
//     try{
//     const updatedUser = await User.findByIdAndUpdate(req.params.id,
//     { $push: {courses: req.body.courses  }},{new :true}
//     )
//      res.json(updatedUser)
//     }catch (err){
//       res.json({msg:err})
//     }
//   })
router.put('/:id/:courseID',  (req,res)=>{
    console.log(req.params.courseID);
    console.log(req.params.id);

     User.findById(req.params.id, (err,foundUser)=>{
        
        console.log(foundUser);
        if(foundUser.courses.includes(req.params.courseID)){
           return console.log(foundUser);

        }else{
foundUser.courses.push(req.params.courseID)
foundUser.save((err,saved)=>{
    res.json(saved)
})
        }
     }
      )
     
      })
// get all user for testing only 
router.get('/',(req,res)=>{
   User.find({} , (err,allUser)=>{
       if(err) {console.log(err)}
       res.json(allUser)
   })
    
})


// get one user 
// router.get('/:id', async(req,res)=>{
//     try{
//    const user = await User.findById(req.params.id) 
//    res.json(user)
//    console.log('working')
// }catch (err){
//     res.json(err)
// }
// })
router.get('/:id', async(req,res)=>{
    User.findById(req.params.id)
    .populate('courses')
    .then((result)=>{
        res.json(result)
    })
})
router.put('/:id' , async (req,res)=>{
    try{
      const updatedUser = await User.findByIdAndUpdate(
         req.params.id  ,
        { $set: {img: req.body.img, username: req.body.username  }},{new :true}
        )
        console.log("working")
      res.json(updatedUser)
    }catch (err){
      res.json({msg:err})
    }
  })
 

module.exports = router 