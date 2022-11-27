const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 Characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "please Enter your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    Collage_name: {
        type: String,
        required: [true, "Please Enter your Collage Name"],
    },
    Student_Id: {
        type: String,
        required: [true, "Please Enter your Student ID"],
    },
    role: {
        type: String,
        default: "user",
    },
    team: {
        type: String,
        default: "",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
            next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT Token

    userSchema.methods.getJWTToken = function(){
        return jwt.sign({ id : this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    };

// compare password
    userSchema.methods.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    }

// Forget Password && Generating Reset Token

userSchema.methods.getResetPasswordToken = function(){

//Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

// Hashing and add to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hax");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);