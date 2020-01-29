const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

 
//create new user and hash the password
router.post('/', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password , 10) //10 for salt
    User.create({username: req.body.username,
    email:req.body.email,
    password: hashedPassword
}, (error, newUser) => {
      res.json(newUser);
    })
}catch (err){
res.json(err)
}

  })

// check log in
router.post('/login',  async(req,res)=>{
     
    const user =  await User.findOne({username: req.body.username })
    if(user == null){
        res.status(400).send({msg: "The user cant be found"})

    }
    try{
      if(await bcrypt.compare(req.body.password , user.password)){
          res.send("success")
      }else{
          res.send("not allowed")
      }
    }catch{}
    res.status(500).send()
   
})
// get all user for testing only 
router.get('/',(req,res)=>{
   User.find({} , (err,allUser)=>{
       if(err) {console.log(err)}
       res.json(allUser)
   })
    
})
//get one user 
router.get('/:id', async(req,res)=>{
    try{
   const user = await User.findById(req.params.id) 
   res.json(user)
}catch (err){
    res.json(err)
}
})

module.exports = router;