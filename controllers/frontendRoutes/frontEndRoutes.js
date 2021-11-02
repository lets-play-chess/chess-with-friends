// Front End Routes - WSK Checked
const express = require('express');
const router = express.Router();
const {UserFriends,User,Lobby} = require('../../models');

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

// Lobby Page Get Request
router.get("/lobby", (req,res)=>{
    res.render("lobby")
});

// Game Board Get Request
router.get("/gameboard", (req,res)=> {
    res.render("game-board")
})

// Test example
router.get("/test", (req,res)=>{
    UserFriends.findAll().then(UFData=>{
        const hbdata = UFData.map(item=>item.get({plain:true}))
        res.render("test",{friends:hbdata})
    })

})


// router.get("/login",(req,res)=>{
//     // Serve login form here
//     res.render("login")
// })

module.exports = router;