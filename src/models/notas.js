const sequelize = require('../database/db');
const { Model, DataTypes } = require('sequelize');

class note extends Model { }
note.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    importance: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "note"
}
)

module.exports = note;