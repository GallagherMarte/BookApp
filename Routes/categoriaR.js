const express = require('express')


const router = express.Router();

const Controller = require('../controllers/CategoriaController')

router.get("/Categoria-list",Controller.getcategoriasList);
router.get("/edit-Categoria/:CategoriaID",Controller.getEditcategorias);
router.get("/Create-Categoria",Controller.getCreateCategoris);

router.post("/Create-Categoria",Controller.postCreateCategoris);
router.post("/edit-Categoria",Controller.postEditCategoria);
router.post("/delete-Categoria",Controller.PostDeletecategorias);

module.exports = router;