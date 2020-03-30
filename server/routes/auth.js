const express = require("express");
const {signup, signin, signout} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {userSignUpValidator} = require("../validator")

const router = express.Router();

router.post("/signup",userSignUpValidator, signup);
router.post("/signin", signin);
//sign out
router.get("/signout", signout);

//contain user id 
router.param("userId", userById)

module.exports = router;
