const express = require('express');
const app = express();
const mongoose = require('mongoose');
const coursesRoute = require('./routes/courses')
const userRoute = require('./routes/users')
const cors= require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//fix cors problem
app.use(cors());
mongoose.connect('mongodb://localhost:27017/courseExam', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});


//app.use() midle were to chech the user loging status

app.use('/courses' , coursesRoute)
app.use('/users' , userRoute)
// app.use('/course/post' ,()=>{
//     console.log("post is work")
// })


// ///route 
// app.get('/course/',(req,res)=>{
//     res.send("recived ")
// })

// app.post('/course/post',(req,res)=>{
//     res.send("recived ")
// })


//port
const port = 7000
app.listen(port, () => {
    console.log('listening ' + port);
});
