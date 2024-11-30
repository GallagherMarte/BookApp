const Sequelize = require('sequelize');
const sequelize = require("../util/dataBase");

const librosT = sequelize.define("libros", {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    AñoPublicacion: {
        type: Sequelize.INTEGER, // Para el año de publicación
        allowNull: false
    },
    imagenLibro:{
        type: Sequelize.STRING, // Para el año de publicación
        allowNull: true
    },
    Categoria: {
        type: Sequelize.STRING, // Para la categoría del libro
        allowNull: false
    },
    Autor: {
        type: Sequelize.STRING, // Nombre del autor del libro
        allowNull: false
    },
    Editorial: {
        type: Sequelize.STRING, // Nombre de la editorial
        allowNull: false
    },
  
   
});

module.exports = librosT;


