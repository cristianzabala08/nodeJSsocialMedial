const express = require("express");

const {getSms} = require ('../../controllers/sms.controllers');

const router = express.Router();

router.get("/",getSms);

module.exports = router;