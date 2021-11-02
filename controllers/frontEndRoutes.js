// Front End Routes - WSK Checked
const express = require('express');
const router = express.Router();
const {UserFriends,User} = require('../models');

// Home Page get request
router.get("/",(req,res)=>{
    // Home Page
    res.render("home")
})

// Profile Page Get Request
router.get("/profile",(req,res)=>{
    // IF not logged in, return to login page
    if(!req.session.user){
        return res.redirect("/")
    }
    // IF logged in, find user and render handblebars user page
    User.findByPk(req.session.user.id,{
        include:[UserFriend]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("user", hbsUser)
    })
})

router.get("/profile",(req,res)=>{
    // IF not logged in, return to login page
    if(!req.session.user){
        return res.redirect("/")
    }
    // IF logged in, find user and render handblebars user page
    User.findByPk(req.session.user.id,{
        include:[UserFriend]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("user", hbsUser)
    })
})
// router.get("/login",(req,res)=>{
//     // Serve login form here
//     res.render("login")
// })

module.exports = router;