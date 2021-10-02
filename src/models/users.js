const sequelize = require('../database/db')
const { Model,DataTypes } = require('sequelize')

class User extends Model{}
User.init({
    name_user:{
        type:DataTypes.STRING,
        allowNull: false},
    clave_user:{ 
        type:DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    modelName: "user"
})


module.exports = User;