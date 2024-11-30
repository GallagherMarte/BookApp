const express = require('express')


const router = express.Router();

const Controller = require('../controllers/AutorController')

router.get("/Autor-list",Controller.getAutorList);
router.get("/edit-Autor/:AutorId",Controller.getEditautor);
router.get("/Create-Autor",Controller.getCreateAutor);

router.post("/Create-Autor",Controller.postCreateautor);
router.post("/edit-Autor",Controller.postEditAutor);
router.post("/delete-Autor",Controller.PostDeleteAutor);

module.exports = router;