const express = require("express");
const { 
    registerUser,
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserdetails, 
    updatePassword,
    getUser,
    getAllUsers,
    updateUserRole,
    deleteUserAdmin,
    getEnroll,
    createUsersList,
    createUsersListCourse,
    createContact
} = require("../controller/userController");
const {isAuthenticatedUser, authorizeRoles} = require("../Middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserdetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router
.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"), getUser).put(isAuthenticatedUser,authorizeRoles("admin"), updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"), deleteUserAdmin);

router
.route("/admin/user")
.get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers );

router.route("/registrations")
.put(isAuthenticatedUser,createUsersList);

router.route("/contactus")
.put(createContact);

router.route("/courseregistrations").put(isAuthenticatedUser,createUsersListCourse);
module.exports = router;