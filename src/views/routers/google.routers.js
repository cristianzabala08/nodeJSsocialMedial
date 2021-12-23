const express = require("express");

const {getGoogle,getGoogleById,googleAuth,googleCallBack} = require ('../../controllers/google.controllers');

const router = express.Router();
router.get("/auth",googleAuth);
router.get("/callback",googleCallBack);
//router.get("/auth",getGoogle);
router.get("/",getGoogle);
router.get("/byid",getGoogleById);

module.exports = router;