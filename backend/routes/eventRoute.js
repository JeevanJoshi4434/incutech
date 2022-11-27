const express = require("express");
const { isAuthenticatedUser,  authorizeRoles, isAuthenticated, fetchuser } = require("../Middleware/auth");
const { getAllEvents, createEvent, DeleteEvent, createProduct } = require('../controller/eventController');
const router = express.Router();

router.route('/events').get(isAuthenticatedUser,getAllEvents);
router.route('/admin/create-event').post(isAuthenticatedUser , authorizeRoles("admin"),createEvent);
router.route('/admin/delete-event/:id').delete(isAuthenticatedUser , authorizeRoles("admin"),DeleteEvent);

module.exports = router;
