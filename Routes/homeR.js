const express = require('express');

const router = express.Router()

const homeControl = require('../controllers/homeController');

router.get("/",homeControl.getLibroslist);
router.get("/Filtro-name",homeControl.getNombreLibros)
router.get("/Filtro-Tipo",homeControl.getTipoLibros)
router.get("/libro",homeControl.getDetalles)

module.exports = router;