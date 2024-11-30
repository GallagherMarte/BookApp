const Sequelize = require('sequelize');
const sequelize = require('../util/dataBase');

const AutoresT = sequelize.define('Author', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Correo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});


module.exports = AutoresT;