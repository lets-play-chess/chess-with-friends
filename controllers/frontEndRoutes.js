// Front End Routes - WSK Checked
const express = require('express');
const router = express.Router();
const {UserFriends,User} = require('../models');

router.get("/",(req,res)=>{
    // Home Page
    // ASSUMES CREATEUSER VIEW IN MVC PARADIGM, 
    // expects createUser.handlebars to exist
    res.render("createUser")
})

// Profile Page Get Request
router.get("/profile",(req,res)=>{
    // IF not logged in, return to login page
    if(!req.session.user){
        return res.redirect("/login")
    }
    // IF logged in, 
    User.findByPk(req.session.user.id,{
        include:[UserFriend]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("profile", hbsUser)
    })
})

router.get("/login",(req,res)=>{
    // Serve login form here
    res.render("login")
})

module.exports = router;