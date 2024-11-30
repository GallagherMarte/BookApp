const Sequelize = require('sequelize');
const sequelize = require('../util/dataBase');

const CategoriaT = sequelize.define('categoria', {
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
    Descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = CategoriaT;