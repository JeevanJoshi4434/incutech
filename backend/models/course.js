const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title is invalid"],
        minLength: [5, 'title must be 4 Characters and more'],
        maxLength: [40, "Characters cannot exceed more than 40 words "]
    },
    description: {
        type: String,
        require: [true, "Description is invalid"]
    },
    Course_ID: {
        type: String,
        require: true
    },
    CollageName: {
        type: String,
        require: true
    },
    fromDate:{
        type: String,
        require: true
    },
    toDate:{
        type: String,
        require: true
    },
    registrations:[
        {
            Student_name: {
                type:String,
                require:true
            },
            Student_ID: {
                type:String,
                require:true
            },
            Collage_name: {
                type:String,
                require:true
            },
            title:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            }
        }
    ]
});

module.exports = mongoose.model('Course', courseSchema);