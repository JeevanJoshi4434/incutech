const Course = require('../models/course');
// const UpcomingCourses = require('../models/upcomingCoursess'); Introduce in version 2.0
const ErrorHander = require("../utils/errorhander")
const syncError = require("../Middleware/catchasyncErrors");
const ApiFeatures = require("../utils/apifeture");

// create a Courses -- Admin
exports.createCourse = syncError(async (req, res, next) => {

    req.body.user = req.user.id;

    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        course
    })
});

// get all Courses
exports.getAllCourses = syncError(async (req, res) => {

    const resultPerPage = 5;
    const courseCount = await Course.countDocuments();

    const apifeature = new ApiFeatures(Course.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const course = await apifeature.query;
    res.status(200).json({
        success: true,
        course
    })
});


// Delete a Course -- Admin

exports.DeleteCourse = syncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id)

    if (!course) {
        return res.status(500).json({
            success: false,
            message: "Something Error happened !!"
        })
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        course
    })

});

// Reviews -- Later.. Coming soon...

