const Sequelize = require('sequelize');
const sequelize = require('../util/dataBase');

const Editorial = sequelize.define('editorial', {
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
    Telefono: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Pais: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Editorial;
