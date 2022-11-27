const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    massage:{
        type:String,
        require:true,
    }

});

module.exports = mongoose.model('contact', ContactSchema);