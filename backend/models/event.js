const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    Title: {
        type: String,
        require: [true, "Title is invalid"],
        minLength:[5, 'title must be 4 Characters and more'],
        maxLength:[40, "Characters cannot exceed more than 40 words "]
    },
    Description: {
        type: String,
        require: [true, "Description is invalid"]
    },
    onDate: {
        type: String,
        require: [true, "Must enter the envent's start date"]
    },
    Event_ID: {
        type: String,
        require: [true, "Must enter the event's ID"]
    },
    cName:{
        type:String,
        require: true,
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

module.exports = mongoose.model("Event", eventSchema);