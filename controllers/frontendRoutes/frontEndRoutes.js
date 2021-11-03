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
        const strFriends = userData.friends_list;
        const friendsArr = strFriends.split(' ');
        wrapper(friendsArr,hbsUser,res);
    })
})
const wrapper = async (friendsArr, hbsUser,res) => {
    hbsUser.friend = await friendArrManip(friendsArr);
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(hbsUser.friend);
    res.render("user", hbsUser)
}
const friendArrManip = async (friendsArr) => {
    const friends = [];
    await friendsArr.forEach( async friendID => {
        const userdata = 
        await User.findOne({
            where: {
                id: friendID,
            }
        })
        const userData = userdata.get({plain: true});
        console.log(userData);
        console.log('-----------------------------------------------');
        friends.push(userData.username);
    });
    return friends;
}

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