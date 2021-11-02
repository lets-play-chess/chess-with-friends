// Index router - WSK checked
const express = require('express');
const router = express.Router();

const frontEndRoutes = require("./frontEndRoutes.js");
router.use(frontEndRoutes);
const apiRoutes = require("./api");
router.use("/api",apiRoutes);
router.get("/",(req,res)=>{
    res.send("test api route")
})
const sessionRoutes = require("./sessionsRoutes")
router.use("/sessions",sessionRoutes)

module.exports = router;