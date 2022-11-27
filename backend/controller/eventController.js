const Event = require('../models/event');
const Product = require('../models/event');
// const UpcomingEvents = require('../models/upcomingEvents'); Introduce in version 2.0
const ErrorHander = require("../utils/errorhander")
const syncError = require("../Middleware/catchasyncErrors");
const ApiFeatures = require("../utils/apifeture");


// create a Event -- Admin

exports.createEvent = syncError(async (req, res, next) => {

    req.body.user = req.user.id;

    const event = await Event.create(req.body);

    res.status(201).json({
        success: true,
        event
    })
});

// get all Events
exports.getAllEvents = syncError(async (req, res) => {

    // const resultPerPage = 5;
    // const eventCount = await Event.countDocuments();

    const apifeature = new ApiFeatures(Event.find(), req.query)
        .search()
        .filter()
        // .pagination(resultPerPage);
    const events = await apifeature.query;
    res.status(200).json({
        success: true,
        events
    })
});


// Delete a Event -- Admin

exports.DeleteEvent = syncError(async (req, res, next) => {
    const event = await Event.findById(req.params.id)

    if (!event) {
        return res.status(500).json({
            success: false,
            message: "Something Error happened !!"
        })
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        event
    })

});

// Reviews -- Later.. Coming soon...

