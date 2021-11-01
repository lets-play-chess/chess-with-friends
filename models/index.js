const User = require("./User");
const Pet = require("./Pet");
// const Group = require("./Group");

User.hasMany(Pet,{
    onDelete:"CASCADE"
});
Pet.belongsTo(User);

// User.belongsToMany(Group,{
//     through:"UserGroup"
// })

// Group.belongsToMany(User,{
//     through:"UserGroup"
// })

module.exports={
    User,
    Pet,
    // Group
};
