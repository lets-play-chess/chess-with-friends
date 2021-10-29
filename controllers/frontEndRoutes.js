const express = require('express');
const router = express.Router();
const {Pet,User} = require('../models');

router.get("/",(req,res)=>{
    Pet.findAll({
        order:["UserId"],
        include:[User]
    }).then(petData=>{

        const hbsPets = petData.map(pet=>pet.get({plain:true}))
        // res.json(hbsPets)
        res.render("home",{
            pets:hbsPets
        })
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Pet]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("profile",hbsUser)
    })
})

router.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = router;