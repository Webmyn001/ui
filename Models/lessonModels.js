const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Lesson = new Schema({
    Title: {
        type: String,
        
    },
    Subtitle: {
        type: String,
       
    },
    Body1: {
        type: String,
       
    },
    Body2: {
        type: String,
       
    },
    Body3: {
        type: String,
       
    },
    image1: 
    {
        type : String,
        

    },
    Body4: {
        type: String,
       
    },
    
    
},{ timestamps: true });
module.exports = mongoose.model('Lesson', Lesson);