// Routes for whether or not the user is logged in

const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json(req.session);
})

router.get("/addcounter",(req,res)=>{
    if(req.session.count){
        req.session.count++
    } else {
        req.session.count = 1;
    }
    res.send("count updated!")
})

router.get("/chessclub",(req,res)=>{
    if(req.session.user){
        res.send(`welcome to the chess club, ${req.session.user.username}!`)
    } else{
        res.status(401).send("You need to log in")
    }
})

module.exports = router;