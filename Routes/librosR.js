const express = require('express')

const router = express.Router();

const librosControl = require('../controllers/LibrosController')

router.get("/Libros-list", librosControl.getlibroslist);
router.get("/edit-Libros/:LibrosId",librosControl.getEditLibros);
router.get("/Create-libros",librosControl.getCreateLibros);



router.post("/Create-libros",librosControl.PostCreteLibros);
router.post("/edit-Libros",librosControl.PostEditlibros);
router.post("/delete-Libros",librosControl.Postdeletelibros);

module.exports = router;