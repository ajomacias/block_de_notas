const Sequelize = require('sequelize');
const data = require('../config/config')

const sequelize = new Sequelize(data.database,data.username,data.password,{
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize;