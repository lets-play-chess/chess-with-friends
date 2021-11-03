// This deals with the Users Table
const express = require('express');
const router = express.Router();
const io = require('../../index')
const { User, UserFriends, Lobby } = require('../../models');
const bcrypt = require("bcrypt");

function joinGameRoom(gameRoom) {
    console.log("joined room" + gameRoom);
    socket.broadcast.to(gameRoom).emit("sendMessage", "SERVER : a user just joined");
    if (gameRoom) {
        socket.join(gameRoom);
        //users.filter(foundUser => foundUser.id == socket.id)[0].gameRoom = gameRoom;
    }
}

function joinNotiRoom(notiRoom) {
    console.log("joined room" + notiRoom);
    socket.broadcast.to(notiRoom).emit("sendMessage", "SERVER : a user just joined");
    if (notiRoom) {
        socket.join(notiRoom);
        //users.filter(foundUser => foundUser.id == socket.id)[0].notiRoom = notiRoom;
    }
}

router.get("/", (req, res) => {
    // Basic get Requests - get all
    User.findAll().then(UserData => {
        res.json(UserData)
    }).catch(err => {
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

router.get("/:id", (req, res) => {
    // Basic get Requests - get one
    User.findByPk(req.params.id).then(UserData => {
        if (UserData) {
            res.json(UserData)
        } else {
            res.status(404).json({err:"No such user."});
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({err});
    })
});

router.post("/", (req, res) => {
    // Create new user API route 
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        ngames:0,
        wins:0,
        ties:0,
        user_rank:0,
    }).then(newUser => {
            req.session.user = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            // ngames: newUser.ngames,
            // wins:newUser.wins,
            // ties:newUser.ties,
            // user_rank: newUser.user_rank
          };
          return res.json({newUser});

    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "User creation failed:", err: err })
    })
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(foundUser => {
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
        return res.json({
          id:foundUser.id,
          username:foundUser.username,
          email:foundUser.email
        });
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

router.put("/profile/:id", (req, res) => {
    // Update User API Route
    // 
    User.update({
        username: req.body.username,
        email: req.body.email,
        // TODO
        // THIS IS WHERE LOGIC TO ADD PLAYED GAMES HAPPENS
        // Update user by id every time there is
    }, {
        where: {
            id: req.params.id
        }
    }).then(updatedData => {
        if (updatedData[0]) {
        return res.json({updatedData});
        } else {
          res.status(404).json({ err: "no such user found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
})

router.delete("/:id", (req, res) => {
    // Delete User by ID
    // This one works perfectly!
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        if (delUser) { res.json(delUser) }
        else { res.status(404) }
    })
})


// router.post('/', (req, res) => {
//     // Add a Friend
//     // Takes in session id and puts as user 1
//     // Takes in input user id and puts as user 2
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     });
// })

module.exports = router;

