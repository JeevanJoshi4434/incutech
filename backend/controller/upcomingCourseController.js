const Upcomingcourse = require('../models/upcomingCourse');
const ErrorHander = require("../utils/errorhander");
const syncError = require("../Middleware/catchasyncErrors");
const apifeatures = require("../utils/apifeture");
const ApiFeatures = require('../utils/apifeture');

// create a upcoming course -- Admin
exports.createUpcomingCourse = syncError(async(req,res,next) =>{
        req.body.user = req.user.id;
        const upcomingcourse = await Upcomingcourse.create(req.body);
        
        res.status(201).json({
            success: true,
            upcomingcourse
        })
});

// get all courses

exports.getAllUpcomingCourses = syncError(async(req,res)=>{
    const resultPerPage = 5;
    const upcomingcourseCount = await Upcomingcourse.countDocuments();

    const apifeature = new ApiFeatures(Upcomingcourse.findOne(), req.quary)
    .search()
    .filter()
    .pagination(resultPerPage);
    const upcomingcourse = await apifeature.query;
    res.status(200).json({
        success:true,
        upcomingcourse
    })
});

// Delete Event of Course -- Admin

exports.deleteUpcomingCourse = syncError(async(req,res,next) => {
    const upcomingcourse = await Upcomingcourse.findById(req.params.id);

    if(!upcomingcourse){
        return res.status(500).json({
            success:false,
            message: "Something Error !"
        })
    }

    await Upcomingcourse.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        upcomingcourse
    })
});