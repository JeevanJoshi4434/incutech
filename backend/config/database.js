const mongoose = require('mongoose');


const connectdatabase = ()=>{

    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true,
    }).then((data)=>{
        console.log(`Mongodb connected at: ${data.connection.host}`);
    })
    
};

module.exports = connectdatabase