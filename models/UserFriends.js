const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFriends extends Model { }

UserFriends.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    user1_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    user2_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'cascade'
    },
}, {
    sequelize,
});

module.exports = UserFriends