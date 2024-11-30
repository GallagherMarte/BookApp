const Editorial = require('../models/editorial');

// Obtener lista de editoriales
exports.getEditorialList = (req, res, next) => {
    Editorial.findAll()
        .then(result => {
            const editoriales = result.map(result => result.dataValues);
            res.render("editorial/editorial-list", {
                pageTitle: "Editoriales",
                EditorialActive: true,
                editoriales: editoriales,
                hasLibros: editoriales.length > 0
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// Mostrar formulario para crear una nueva editorial
exports.getCreateEditorial = (req, res, next) => {
    res.render("editorial/save-editorial", {
        pageTitle: "Crear Editorial",
        EditorialActive: true,
        editMode: false
    });
};

// Guardar una nueva editorial
exports.postCreateEditorial = (req, res, next) => {
    const nombre = req.body.Nombre;
    const telefono = req.body.Telefono;
    const pais = req.body.pais;

    Editorial.create({
        Nombre: nombre,
        Telefono: telefono,
        Pais: pais
    })
    .then(result => {
        res.redirect('/editorial-list');
    })
    .catch(err => {
        console.log(err);
    });
};

// Obtener formulario para editar una editorial
exports.getEditEditorial = (req, res, next) => {
    const editMode = req.query.edit;
    const editorialId = req.params.EditorialId;

    if (!editMode) {
        return res.redirect('/editorial-list');
    }

    Editorial.findOne({ where: { Id: editorialId } })
        .then(result => {
            const editorial = result.dataValues;

            if (!editorial) {
                return res.redirect('/editorial-list');
            }

            res.render("editorial/save-editorial", {
                pageTitle: "Editar Editorial",
                EditorialActive: true,
                editMode: editMode,
                editoriales: editorial
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// Actualizar una editorial existente
exports.postEditEditorial = (req, res, next) => {
    const editorialId = req.body.EditorialId;
    const nombre = req.body.Nombre;
    const telefono = req.body.Telefono;
    const pais = req.body.pais;

    Editorial.update({
        Nombre: nombre,
        Telefono: telefono,
        Pais: pais
    }, { where: { Id: editorialId } })
        .then(result => {
            res.redirect('/editorial-list');
        })
        .catch(err => {
            console.log(err);
        });
};

// Eliminar una editorial
exports.postDeleteEditorial = (req, res, next) => {
    const editorialId = req.body.EditorialId;

    Editorial.destroy({ where: { Id: editorialId } })
        .then(result => {
            res.redirect('/editorial-list');
        })
        .catch(err => {
            console.log(err);
        });
};
