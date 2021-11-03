const sequelize = require("../config/connection");
const {User,UserFriends} = require("../models")
// const UserData = require(./User.json);

const seed = async ()=>{
    try {
    //await sequelize.sync({force:true});
    const userData = await User.bulkCreate([
        {
            username:"Whitney",
            password:"password",
            email:"whit@play.chess",
            ngames:0,
            wins:0,
            ties:0,
            user_rank:0
        },
        {
            username:"Evelyn",
            password:"password",
            email:"eve@play.chess",
            ngames:0,
            wins:0,
            ties:0,
            user_rank:0
        },
        {
            username:"Kyle",
            password:"password",
            email:"kyle@play.chess",
            ngames:0,
            wins:0,
            ties:0,
            user_rank:0
        },
        {
            username:"Carsdan",
            password:"password",
            email:"cars@play.chess",
            ngames:0,
            wins:0,
            ties:0,
            user_rank:0
        },
    ],{
        individualHooks:true
    })
    const friendsData = await UserFriends.bulkCreate([
        {
            user1_id:1,
            user2_id:2,
        },        {
            user1_id:2,
            user2_id:1,
        },

    ])
} catch (err) {
    console.log(err)
    throw err
}}

sequelize.sync({force:true}).then(()=>{
    seed();
})