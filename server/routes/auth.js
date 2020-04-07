const express = require("express");

const {signup, signin, signout, forgotPassword, resetPassword} = require("../controllers/auth");

const {userById} = require("../controllers/user");

const {userSignUpValidator, passwordResetValidator} = require("../validator")

const router = express.Router();

router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
//sign out
router.get("/signout", signout);

// password forgot and reset routes
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', passwordResetValidator, resetPassword);

//contain user id 
router.param("userId", userById)

module.exports = router;
