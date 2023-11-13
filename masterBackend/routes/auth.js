const express = require("express")

const router=express.Router();
const {checkBodyParams} =require("../middlewares/general");
const {signUp,login,activateAccount,handlePasswordUpdateDetails,sendForgetPasswordLink} = require("../controllers/authentication")

router.post("/signup",checkBodyParams,signUp);

router.get("/activate-account/:token", activateAccount);

router.post("/login",login);
router.post("/forget-password", sendForgetPasswordLink);

router.post("/handle-update-password", handlePasswordUpdateDetails);


module.exports = router;