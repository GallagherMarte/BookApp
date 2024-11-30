const Autor = require('../models/Autores')
const Libro = require('../models/libros')

// Controlador para obtener la lista de autores con el número de libros asociados
exports.getAutorList = (req, res, next) => {
    Autor.findAll({
        include: [{
            model: Libro,  // Incluir los libros asociados al autor
            attributes: [] // No traer detalles de los libros, solo queremos el conteo
        }]
    })
        .then(result => {
            const Autor = result.map((author) => {
                // Contamos los libros asociados a cada autor
                const librosCount = author.libros ? author.libros.length : 0;  // Usamos .length para contar los libros

                // Devolvemos el autor con el conteo de libros
                return {
                    ...author.dataValues,
                    librosCount  // Incluimos el conteo de libros en el objeto del autor
                };
            });

            Autor.forEach(author => {
                console.log(`Autor: ${author.Nombre}, Cantidad de libros: ${author.librosCount}`);
            });

            // Renderizamos la vista con los datos de los autores y su cantidad de libros
            res.render("author/author-list", {
                pageTitle: "Autores",
                AutorActive: true,
                Autor: Autor,
                hasLibros: Autor.length > 0  // Indicamos si hay autores
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCreateAutor = (req, res, next) => {
    res.render("author/save-author", {
        pageTitle: "Autor",
        AutorActive: true,
        EditMode: false
    })
}
exports.postCreateautor = (req, res, next) => {
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo


    Autor.create({
        Nombre: Nombre,
        Correo: Correo,


    }).then(result => {
        res.redirect('/Autor-list')
    }).catch(err => {
        console.log(err)
    })
}
exports.getEditautor = (req, res, next) => {
    const edit = req.query.edit
    const Categoria = req.params.AutorId;

    if (!edit) {
        return res.redirect('/Autor-list')
    }

    Autor.findOne({ where: { Id: Categoria } })
        .then(result => {
            const Autor = result.dataValues;

            if (!Autor) {
                return res.redirect('/Autor-list');
            }
            res.render("author/save-author", {
                pageTitle: "Region",
                regionActive: true,
                editMode: edit,
                Autor: Autor

            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postEditAutor = (req, res, next) => {
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo
    const Categoria = req.body.AutorId;
    console.log(Categoria)

    Autor.update({
        Nombre: Nombre,
        Correo: Correo,


    }, { where: { Id: Categoria } }).then(result => {
        res.redirect('/Autor-list')
    }).catch(err => {
        console.log(err)
    })
}
exports.PostDeleteAutor = (req, res, next) => {

    const idAutor = req.body.AutorId;
    console.log(idAutor)

    Autor.destroy({ where: { Id: idAutor } })
        .then(result => {
            res.redirect('/Autor-list')
        }).catch(err => {
            console.log(err)
        })

}