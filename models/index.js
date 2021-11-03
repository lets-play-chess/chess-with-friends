const User = require("./User");
const UserFriends = require("./UserFriends");
const Lobby = require("./Lobby")

// User.hasMany(UserFriends,{
//     // foreignKey: "user1_id",
//     onDelete:"CASCADE"
// });
// UserFriends.belongsTo(User, {
//     // foreignKey: "user1_id"
// });

User.belongsToMany(User, {
    through: "UserFriends",
    as: "Friend"
})

// Lobby.hasMany(User, {
//     // foreignKey: "host_id"
// });

// User.belongsTo(Lobby,{
//     // foreignKey: "host_id"
// });


module.exports={
    User,
    UserFriends,
    Lobby,
};
