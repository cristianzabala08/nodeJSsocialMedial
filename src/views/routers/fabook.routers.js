const express = require("express");

const { getFacebook, facebook, facebookCallBack } = require('../../controllers/facebook.controllers');

const router = express.Router();


router.get('/facebook', facebook);
router.get('/facebook/callback', facebookCallBack);
router.get("/profile", getFacebook);

router.get('/', (req, res) => {
    res.send("index");
});



/*  
router.post("/sing",getFacebookId);
router.get('/facebook',facebook);
router.get('/facebook/callback',facebookCallBack); */


module.exports = router;