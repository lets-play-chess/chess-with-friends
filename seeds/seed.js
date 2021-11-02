const sequelize = require("../config/connection");
const {User,UserFriends,Lobby} = require("../models")
// const UserData = require(./User.json);

const seed = async ()=>{
    try {
    //await sequelize.sync({force:true});
    const userData = await User.bulkCreate([
        {
            username:"Whitney",
            password:"password",
            email:"whit@play.chess"
        },
        {
            username:"Evelyn",
            password:"password",
            email:"eve@play.chess"
        },
        {
            username:"Kyle",
            password:"password",
            email:"kyle@play.chess"
        },
        {
            username:"Carsdan",
            password:"password",
            email:"cars@play.chess"
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