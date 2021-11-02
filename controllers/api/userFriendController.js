// This deals with the UserFriend Table

const express = require('express');
const router = express.Router();
const {User,UserFriends, Lobby} = require('../../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    // Basic get Requests - get all
    UserFriends.findAll().then(UFData=>{
        res.json(UFData)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
});


router.get("/:id",(req,res)=>{
    // Basic get Requests - get one
    UserFriends.findByPk(req.params.id).then(UFData=>{
        if(UFData){
            res.json(UFData)
        } else {
            res.status(404).json({err:"No such UF."});
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err});
    })
});

router.post("/",(req,res)=>{
    // Create new user API route 
    UserFriends.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }).then(newUser=>{
        req.session.user = {
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username
          };
        res.json(newUser);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"User creation failed:",err:err})
    })
});

router.put("/:id", (req,res)=>{
    // Update User API Route
    // 
    UserFriends.update({

    },{
        where:{
            id:req.params.id
        }
    }).then(updatedData => {
        if (updatedData[0]) {
          res.json(updatedData);
        } else {
          res.status(404).json({ err: "no such user found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
})
  
router.delete("/:id",(req,res)=>{
    // Unfriended
    UserFriends.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(deletedUser => {
          if (deletedUser) {
            res.json(deletedUser);
          } else {
            res.status(404).json({ err: "no such user found!" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
})

module.exports = router;