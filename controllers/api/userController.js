const express = require('express');
const router = express.Router();
const {User,UserFriends, Lobby} = require('../../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    // Basic get Requests - get all
    User.findAll().then(UserData=>{
        res.json(UserData)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
});

router.get("/logout", (req,res)=>{
    // Logout request
    req.session.destroy(()=>{
        res.json({msg:"Session destroyed"})
    })
})

router.get("/:id",(req,res)=>{
    // Basic get Requests - get one
    User.findByPk(req.params.id).then(UserData=>{
        if(UserData){
            res.json(UserData)
        } else {
            res.status(404).json({err:"No such user."});
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err});
    })
});

router.post("/",(req,res)=>{
    // Create new user API route 
    User.create({
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

router.post("/login",(req,res)=>{
    // Login User Route 
    User.findOne({
        where:{
            email:req.body.email,
        }
    }).then(foundUser => {
        if (!foundUser) {
          return req.session.destroy(() => {
            return res.status(401).json({ err: "invalid email/password" });
          });
        }
        if (!req.body.password) {
          return req.session.destroy(() => {
            return res.status(401).json({ err: "invalid email/password" });
          });
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.user = {
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username
          };
          return res.json(foundUser);
        } else {
          return req.session.destroy(() => {
            return res.status(401).json({ err: "invalid email/password" });
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
});

router.put("/:id", (req,res)=>{
    // Update User API Route
    // 
    User.update({
        username = req.body.username,
        email:req.body.email,
        // TODO
        // THIS IS WHERE LOGIC TO ADD PLAYED GAMES HAPPENS
        // Update user by id every time there is
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
    // We don't have a use case for deleting users now but I'm keeping it in case.
    User.destroy({
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



// router.post("/",(req,res)=>{
//     // Create new UserFriend'
//     UserFriends.create({
//                 user1_id: req.session.user.id,
//                 user2_id: req.body.user_id
//               }).then(newUser=>{
//                 res.json(newUser);
//             }).catch(err=>{
//                 console.log(err);
//                 res.status(500).json({message:"UserFriend creation failed:",err:err})
//             })
//             // Invert it below to have easier queries
//     UserFriends.create({
//                 user1_id: req.body.user_id,
//                 user2_id: req.session.user.id,
//               });

//     }).then(newUser=>{
//         res.json(newUser);
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({message:"UserFriend creation failed:",err:err})
//     })
// });

// router.post("/",(req,res)=>{
//     // Create URoute
//     User.create({
//         username:req.body.username,
//         password:req.body.password,
//         email:req.body.email
//     }).then(newUser=>{
//         res.json(newUser);
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({message:"User creation failed:",err:err})
//     })
// })

// router.post("/login",(req,res)=>{
//     // Login Form Route
//     User.findOne({

// router.post('/', (req, res) => {
//     // Add a Friend
//     // Takes in session id and puts as user 1
//     // Takes in input user id and puts as user 2
//    const newFriend = UserFriends.create({
//         user1_id: req.session.user.id,
//         user2_id: req.body.user_id
//       });
//     // Invert it below to have easier queries
//     const inverseFriend = UserFriends.create({
//         user1_id: req.body.user_id,
//         user2_id: req.session.user.id,
//       });
//   });


//   router.post('/', (req, res) => {
//     // Play Game button
//     // Takes the user to the lobby page

//   });
  
  
// router.delete("/:id",(req,res)=>{
    // We don't have a use case for deleting users now but I'm keeping it in case.
//     User.destroy({
//         where:{
//             email:req.body.email
//         }
//     }).then(foundUser=>{
//         if(!foundUser){
//             req.session.destroy()
//             res.status(401).json({message:"Incorrect email or password"})
//         } else {
//             if(bcrypt.compareSync(req.body.password,foundUser.password)){
//                 req.session.user = {
//                     username:foundUser.username,
//                     email:foundUser.email,
//                     id:foundUser.id
//                 }
//                 res.json(foundUser)
//             } else {
//                 req.session.destroy()
//                 res.status(401).json({message:"Incorrect email or password"})
//             }
//         }
//     }).catch(err=>{
//          console.log(err);
//         res.status(500).json(err);
//     })
// })

// router.get("/logout",(req,res)=>{
//     // User logout
//     req.session.destroy();
//     res.redirect("/login")
// })

// router.post('/addfriend', (req, res) => {
//     // Add a Friend
//     // Takes in session id and puts as user 1
//     // Takes in input user id and puts as user 2
//    const newFriend = UserFriends.create({
//         user1_id: req.session.user.id,
//         user2_id: req.body.user_id
//       });
//     // Invert it below to have easier queries
//     const inverseFriend = UserFriends.create({
//         user1_id: req.body.user_id,
//         user2_id: req.session.user.id,
//       });
//   });


//   router.post('/', (req, res) => {
//     // Play Game button
//     // Takes the user to the lobby page

//   });
  