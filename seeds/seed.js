const sequelize = require("../config/connection");
const {User,UserFriends,Group} = require("../models")

const seed = async ()=>{
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
        },

    ])
}

sequelize.sync({force:true}).then(()=>{
    seed();
})