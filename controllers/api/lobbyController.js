// Empty because this one is the most complex and will be built last.
const express = require("express");
const router = express.Router();
const { UserFriend, User } = require("../../models");

router.get("/", (req, res) => {
    // Lobby Board
    // render lobyy on "start game" button and accept request button
  res.render("lobby")
});

router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).send("Log in first!")
  }
  // Play Game Route

  res.render("lobby");
  

});

module.exports = router;

// Extra routes

// when you're the host of a lobby
//     hit start GamepadButton
//     request Lobby