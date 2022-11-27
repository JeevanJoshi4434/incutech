const app = require('./app');
const connectDatabase = require("./config/database");
// Uncought Exception handeler
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncought Exception`)
    process.exit(1);
})

// config 
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"})
}
// connect to database
connectDatabase();




const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`)
});



/// Unhandled promise Rejection
process.on("unhandledRejection",err =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});