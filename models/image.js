const mongoose = require('mongoose')
const Schema = mongoose.Schema 

var ImageSchema = new Schema ({
    img: {type: String , default: "none"},
    imageData: {type: String}
})
var Image = mongoose.model("Image" , ImageSchema);
module.exports = Image;