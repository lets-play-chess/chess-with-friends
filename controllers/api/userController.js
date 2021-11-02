const express = require('express');
const router = express.Router();
const { User, UserFriends } = require('../../models');
const bcrypt = require("bcrypt");



router.get("/", (req, res) => {

})

router.post("/", (req, res) => {
    // Create user Form Route
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(newUser => {
        res.json(newUser);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "User creation failed:", err: err })
    })
})

router.post("/login", (req, res) => {
    // Login Form Route
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            req.session.destroy()
            res.status(401).json({ message: "Incorrect email or password" })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.user = {
                    username: foundUser.username,
                    email: foundUser.email,
                    id: foundUser.id
                }
                res.json(foundUser)
                const gameRoom = foundUser.id + "game"
                const notiRoom = foundUser.id + "noti"
                joinGameRoom(gameRoom);
                joinNotiRoom(notiRoom);
            } else {
                req.session.destroy()
                res.status(401).json({ message: "Incorrect email or password" })
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

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

router.get("/logout", (req, res) => {
    // User logout
    req.session.destroy();
    res.redirect("/login")
})

router.post('/', (req, res) => {
    // Add a Friend
    // Takes in session id and puts as user 1
    // Takes in input user id and puts as user 2

    User.findOne({
        where: {
            email: req.body.email
        }

    // const newFriend = UserFriends.create({
    //     user1_id: req.session.user.id,
    //     user2_id: req.body.user_id
    // });
    // // Invert it below to have easier queries
    // const inverseFriend = UserFriends.create({
    //     user1_id: req.body.user_id,
    //     user2_id: req.session.user.id,
    // });
});

// router.post('/', (req, res) => {

// })

  router.post('/', (req, res) => {
    // Play Game button
    // Takes the user to the lobby page

  });


// router.delete("/:id",(req,res)=>{
// We don't have a use case for deleting users now but I'm keeping it in case.
//     User.destroy({
//         where:{
//             id:req.params.id
//         }
//     }).then(delUser=>{
//         res.json(delUser)
//     })
// })

module.exports = router;
