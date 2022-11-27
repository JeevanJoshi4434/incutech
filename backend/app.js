const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./Middleware/error");
var cors = require('cors');
const path = require('path');
//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"})
}
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Route Imports

const user = require("./routes/userRoutes");
const event = require("./routes/eventRoute");
const course = require("./routes/courseRoute");

app.use("/api",user);
app.use("/api",event);
app.use('/api',course);
app.use(express.static(path.join(__dirname,"../build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../build/index.html"));
})
 
// Middleware for error
app.use(errorMiddleware);

module.exports = app;