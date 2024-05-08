const express = require("express");
const {registerUser, userLogin, findUser, getUser} = require("../Controllers/userController");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",userLogin);
router.get("/find/:userId",findUser);
router.get("/listuser",getUser);

module.exports=router;