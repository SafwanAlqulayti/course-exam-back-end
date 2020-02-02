 const express = require('express')
 const router = express.Router();
 const Course = require('../models/course').Course;
 const User = require('../models/user');


 

// router.get('/' , (req ,res)=>{//async
//     console.log(Course.find({}))
//     // try{
//     //     const courses =   Course.find({});//await
//     //     console.log(courses)
//     //     req.json(courses);
//     // }catch (err){
//     //     res.json({message: err})
//     // }
// })
// get all courses
router.get('/', (req, res) => {
    Course.find({}, (err, allCourses) => {
      if (err) { console.log(err) }
      res.json(allCourses);
    });
  });
// router.post('/user/:id', (req ,res)=>{
//   User.findById(req.params.id, (error,foundUser) =>{
     
//   console.log(foundUser.courses)
//     const item = {name:req.body.name , category: req.body.category};
//     foundUser.courses.push(item);
//     foundUser.save((err,savedUser)=>{
//     res.json(savedUser)
//   })
  

 
// } )
// })
  // create new course
router.post('/:id' ,(req ,res)=>{
  Course.create(req.body, (err, createdCourse) => {

    User.findById(req.params.id ,(err ,foundUser)=>{
              console.log(createdCourse._id)
              // res.json(createdCourse)
              console.log(foundUser);
              foundUser.courses.push(createdCourse._id);
              foundUser.save((err,savedUser)=>{
                console.log(savedUser);
                    res.json(savedUser);
                  })
                })

    // console.log(createdCourse._id);
    // res.json(createdCourse);
  })
})
//     const course = new Course({
//         name: req.body.name ,
//         category: req.body.category
//     });
//     course.save()
//     .then(data =>{
//       User.findById(req.param.id ,(err ,foundUser)=>{
//         console.log(data._id)
//         res.json(data)
//         foundUser.courses.push(data._id)
//         foundUser.save((err,savedUser)=>{
//               res.json(savedUser)
//       })
      
//     })
//     // .catch(err=>{
//     //     res.json({message: err})
//     // })
// })
//get one course
router.get('/:id' , async(req ,res)=>{
  try{
  const course =  await Course.findById(req.params.id)
  res.json(course)
}catch (err){
res.json({msg: err})
}
})
//delete course

router.delete('/:id', async (req,res)=>{
  try{
  const removedCourse = await Course.findByIdAndRemove(req.params.id)
   res.json(removedCourse)
  }catch (err){
    res.json({msg:err})
  }
})
//update 

router.put('/:id' , async (res,req)=>{
  try{
    const updatedCourse = await Course.findByIdAndUpdate(
       req.params.id  ,
      { $set: {name: req.body.name }} 
      );
      console.log("working")
    res.json(updatedCourse)
  }catch (err){
    res.json({msg:err})
  }
})



module.exports = router;