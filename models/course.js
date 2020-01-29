const mongoose = require('mongoose');


const examSchema = new mongoose.Schema({
    question: String ,
    answer: String
})

const courseSchema = new mongoose.Schema({

    name: { type: String , required:true } , 
    category: String,
    // exams : [{type : mongoose.Schema.Types.ObjectId , ref : 'Exam'}]
    exams: [examSchema]
})
const Exam = mongoose.model('Exam', examSchema)
const Course = mongoose.model('Course' ,courseSchema);
module.exports = { Course, Exam}