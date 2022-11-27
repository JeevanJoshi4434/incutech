const ErrorHander = require("../utils/errorhander");

module.exports = (err,req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";
    // mongo Cast error

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue )} Entered`
        err =  new ErrorHander(message, 400);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, please try again.`
        err =  new ErrorHander(message, 400);
    }

    // JWT Expire Error
    if(err.name === "TokenExpireError"){
        const message = `Json web token is Expired, please login again.`
        err =  new ErrorHander(message, 400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
    
}