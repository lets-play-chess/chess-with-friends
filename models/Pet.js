const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init({
  name:{
      type:DataTypes.STRING
  },
  species:{
      type:DataTypes.STRING
  },
  age:{
      type:DataTypes.INTEGER
  },
},{
    sequelize, 
});

module.exports=Pet