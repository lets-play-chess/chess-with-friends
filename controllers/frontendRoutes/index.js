// WSK Built Routes
const express = require('express');
const router = express.Router();
const frontEndRoutes = require('./frontEndRoutes')
router.use('/', frontEndRoutes)

// const userRoutes = require("../api/userController");
// router.use("/users",userRoutes);

// const gameRoutes = require("../api/gamesController");
// router.use("/game",gameRoutes);

// const sessionRoutes = require("../sessionsRoutes/sessionsRoutes");
// router.use("/sessions",sessionRoutes)

module.exports = router;