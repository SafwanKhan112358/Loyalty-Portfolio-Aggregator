const express = require("express");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.get("/dashboard", authToken, (req,res) =>{
    res.json({message: "Dashboard Route works"});
});

module.exports = router;