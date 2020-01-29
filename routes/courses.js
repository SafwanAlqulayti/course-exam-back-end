 const express = require('express')
 const router = express.Router();
 const Course = require('../models/course').Course;
 

 

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

  // create new course
router.post('/' ,(req ,res)=>{
    const course = new Course({
        name: req.body.name ,
        category: req.body.category
    });
    course.save()
    .then(data =>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message: err})
    })
})
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

router.patch('/:id' , async (res,req)=>{
  try{
    const updatedCourse = await Course.findByIdAndUpdate(
       req.params.id  ,
      { $set: {name: req.body.name }} 
      );
    res.json(updatedCourse)
  }catch (err){
    res.json({msg:err})
  }
})



module.exports = router;