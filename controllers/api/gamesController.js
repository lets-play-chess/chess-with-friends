// Empty because this one is the most complex and will be built last.
const express = require("express");
const router = express.Router();
const { UserFriends, User } = require("../../models");

router.get("/", (req, res) => {
    // Game Board Page
    // ASSUMES gameBoard VIEW IN MVC PARADIGM, 
    // expects gameBoard.handlebars to exist?
  res.render("gameBoard")
});

router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).send("Log in first!")
  }
});

module.exports = router;
