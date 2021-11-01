const User = require("./User");
const UserFriends = require("./UserFriends");
// const Group = require("./Group");

User.hasMany(UserFriends,{
    foreignKey: "user1_id",
    onDelete:"CASCADE"
});
UserFriends.belongsTo(User, {
    foreignKey: "user1_id"
});

// User.belongsToMany(Group,{
//     through:"UserGroup"
// })

// Group.belongsToMany(User,{
//     through:"UserGroup"
// })

module.exports={
    User,
    UserFriends,
    // Group
};
