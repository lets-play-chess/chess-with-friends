// WSK Built Routes
const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const gameRoutes = require("./gamesController");
router.use("/game",gameRoutes);

const sessionRoutes = require("../sessionsRoutes/sessionsRoutes");
router.use("/sessions",sessionRoutes)

module.exports = router;