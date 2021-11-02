const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Lobby extends Model { }

Lobby.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    host_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    guest_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: 'user',
        //     key: 'id'
        // },
    },
}, {
    sequelize,
});

module.exports = Lobby