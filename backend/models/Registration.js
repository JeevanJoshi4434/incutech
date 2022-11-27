const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    
    Student_name: {
        type:String,
        require:true
    },
    Student_ID: {
        type:String,
        require:true
    },
    onDate: {
        type: Date,
        default: Date.now
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
});

module.exports = mongoose.model("registration", registrationSchema);