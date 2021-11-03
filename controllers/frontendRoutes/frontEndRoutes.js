// Front End Routes
const express = require('express');
const router = express.Router();
const {User,Lobby} = require('../../models');

// Home Page get request
router.get("/",(req,res)=>{
    // Home Page
    return res.render("home")
})

// Profile Page Get Request
router.get("/profile",(req,res)=>{
    // IF not logged in, return to login page
    if(!req.session.user){
        // return res.redirect("/")
    }
    // IF logged in, find user and render handblebars user page
    User.findByPk(req.session.user.id
    ).then(userData=>{
        const hbsUser = userData.get({plain:true});
        console.log(hbsUser);
        hbsUser.losses = hbsUser.ngames - hbsUser.wins - hbsUser.ties;
        if(hbsUser.losses === 0){
            hbsUser.winloss = 'N/A';
        } else {
            hbsUser.winloss = hbsUser.wins / hbsUser.losses;
        }
        res.render("user", hbsUser)
    })
})

// Lobby Page Get Request
router.get("/lobby/", (req,res)=>{
    // if(!req.session.user){
    //     return res.redirect("/")
    // }
    // IF logged in, find user and lobby page
    User.findByPk(req.session.user.id,{
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("lobby", hbsUser)
    })
    //res.render("lobby")
});

// Game Board Get Request
router.get("/gameboard", (req,res)=> {
    res.render("game-board")
})


// router.get("/login",(req,res)=>{
//     // Serve login form here
//     res.render("login")
// })

module.exports = router;