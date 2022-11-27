const ErrorHander = require("../utils/errorhander")
const syncError = require("../Middleware/catchasyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Registration = require("../models/Registration");
const Event = require("../models/event");
const cookieParser = require("cookie-parser");
const Course = require("../models/course");
const Contact = require("../models/contact");


// Register a user

exports.registerUser = syncError(async (req, res, next) => {
    const { name, email, password, Collage_name, Student_Id } = req.body;

    const checkID = await User.findOne({ Student_Id: req.body.Student_Id });
    if (!checkID) {
        const user = await User.create({
            name, email, password, Collage_name, Student_Id
        });
        sendToken(user, 201, res);
    }

    res.status(400).json({
        success: false,
        massage: "Given Student ID is Already registered. Type right ID or Contact to us."
    });
});

// login 

exports.loginUser = syncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email and Passwrd"))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswrdMatched = await user.comparePassword(password);


    if (!isPasswrdMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// logout

exports.logout = syncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
    });
});

// Forgot Password 

exports.forgotPassword = syncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("user not found", 404))
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token for Incubator is:- \n\n ${resetPasswordUrl} \n\n If you've not requested this email than please ignore it`;


    try {

        await sendEmail({
            email: user.email,
            subject: "Incubator Password Recovery mail",
            message,
        });

        res.status(200).json({
            success: true,
            message: `reset link successfully sents to ${user.email}`,
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message, 500))
    }
});

// reset password


exports.resetPassword = syncError(async (req, res, next) => {


    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hax");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHander("Reset Password Token is Invalid or has been expired", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHander("Password Doesn't Match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get User Details 
exports.getUserdetails = syncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHander("Network Error", 500));
    }

    res.status(200).json({
        success: true,
        user,
    })
});

// update User Password 
exports.updatePassword = syncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswrdMatched = await user.comparePassword(req.body.oldPassword);


    if (!isPasswrdMatched) {
        return next(new ErrorHander("old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("Password dosn't match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);

});

// Get Single User (admin)

exports.getUser = syncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User doesn't exist with Id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// Get all User (admin)

exports.getAllUsers = syncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})


// update User Profile -- admin
exports.updateUserRole = syncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: `${req.params.name},data updated successfully`
    })
});

// Delete User Role -- admin
exports.deleteUserAdmin = syncError(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHander(`User doesn't exist with ID: ${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: `${req.body.name}, User deleted successfully`
    })
});

// get enrolled users details

exports.getEnroll = syncError(
    async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });

        const { title, Student_ID, Collage_name } = req.body;
        const { Student_name } = user.name;
        const event = Event._id;


        const EnrolledStudent = await Registration.findOne({ Student_ID: req.body.Student_ID, email: req.body.email, title: req.body.title });
        if (!EnrolledStudent) {
            const enroll = await Registration.create({
                title,
                email: user.email,
                Student_ID: user.Student_Id,
                Collage_name: user.Collage_name,
                onDate: Date.now(),
                Student_name: user.name
            },
            );
            if (!enroll) {
                res.status(400).json({
                    success: false,
                    message: "Network Error"
                })
            } else {
                res.status(201).json({
                    success: true,
                    name: user.name,
                    Student_name,
                    enroll
                })
            }
        } else {

            res.status(400).json({
                success: false,
            })

        }
    });
exports.createUsersList = syncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const data = {
        title:req.body.title,
        email: user.email,
        Student_ID: user.Student_Id,
        Collage_name: user.Collage_name,
        Student_name: user.name
    };
    
    const enroll = await Event.findById(req.body.title);

        enroll.registrations.push(data)
        enroll.numofRegistration = enroll.registrations.length

    await enroll.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});
exports.createUsersListCourse = syncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const data = {
        title:req.body.title,
        email: user.email,
        Student_ID: user.Student_Id,
        Collage_name: user.Collage_name,
        Student_name: user.name
    };
    
    const enroll = await Course.findById(req.body.title);

        enroll.registrations.push(data)
        enroll.numofRegistration = enroll.registrations.length

    await enroll.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

exports.createContact = syncError(async (req, res, next) => {

    const data = {
        email:req.body.email,
        massage:req.body.massage,
    }
    const submit = await Contact.create({
        email:data.email,massage:data.massage
    });
    res.status(201).json({
        success: true,
        submit
    })
});
