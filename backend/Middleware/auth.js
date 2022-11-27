const syncError = require("../Middleware/catchasyncErrors");
const ErrorHander = require("../utils/errorhander");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = syncError( async(req,res,next)=>{
    const{ token }= req.cookies;
    if(!token){
        return next(new ErrorHander("please login to access this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
});


exports.fetchuser = syncError((req, res, next) => {
    // Get the user from the Jwt token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  });
  


exports.isAuthenticated = syncError( async(req,res,next)=>{
    const {authtoken} = req.header("token");

    if(!authtoken){
        return next(new ErrorHander("please login to access this resource", 401))
    }
    const data = jwt.verify(authtoken, process.env.JWT_SECRET);
    req.user = await User.findById(data.id);

    next();
});

exports.authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next( new ErrorHander(
                `Role: ${req.user.role} is not allow to access this resource`, 403
                ));
        };

        next();
    };

}