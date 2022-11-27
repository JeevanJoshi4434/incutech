const express = require("express");
const { getAllCourses, createCourse, DeleteCourse } = require("../controller/courseController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");
const router = express.Router();

router.route('/courses').get(isAuthenticatedUser,getAllCourses);
router.route('/course/admin/create-course').post(isAuthenticatedUser,authorizeRoles("admin"),createCourse);
router.route('/course/admin/delete-course').delete(isAuthenticatedUser,authorizeRoles("admin",DeleteCourse));

module.exports = router;