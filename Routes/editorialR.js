const express = require('express')


const router = express.Router();

const Controller = require('../controllers/editorialController')

router.get("/Editorial-list",Controller.getEditorialList);
router.get("/edit-Editorial/:EditorialId",Controller.getEditEditorial);
router.get("/Create-Editorial",Controller.getCreateEditorial);

router.post("/Create-Editorial",Controller.postCreateEditorial);
router.post("/edit-Editorial",Controller.postEditEditorial);
router.post("/delete-Editorial",Controller.postDeleteEditorial);

module.exports = router;