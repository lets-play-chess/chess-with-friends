const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const petRoutes = require("./gameController");
router.use("/game",petRoutes);

const sessionRoutes = require("../sessionsRoutes");
router.use("/sesssions",sessionRoutes)

module.exports = router;