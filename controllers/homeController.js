const libros = require('../models/libros')
const categoria = require('../models/Categorias')
const autor = require('../models/Autores')
const editoriales = require('../models/editorial')

exports.getLibroslist = (req, res, next) => {

    libros.findAll().then(result => {
        const libro = result.map((result) => result.dataValues)



        categoria.findAll().then(result => {

            const categorias = result.map((result) => result.dataValues)

            autor.findAll().then(result => {

                const autores = result.map((result) => result.dataValues)
                console.log(autores.Name)

                editoriales.findAll().then(result => {
                    const editorial = result.map((result) => result.dataValues)

                    res.render("library/home", {
                        pageTitle: "home",
                        homeActive: true,
                        libros: libro,
                        Categoria: categorias,
                        Autor: autores,
                        Editoriales: editorial,
                        hasLibros: libro.length > 0
                    })

                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })


        }).catch(err => {
            console.log(err)
        });


        //res.redirect('/')
    }).catch(err => {
        console.log(err)
    })

}
exports.getNombreLibros = (req, res, next) => {

    const name = req.query.Filtro
    console.log(name)

    libros.findAll({ where: { Titulo: name } }).then(result => {
        const libro = result.map((result) => result.dataValues)

        if (!name) {
            return res.redirect('/')
        }

        categoria.findAll().then(result => {

            const categorias = result.map((result) => result.dataValues)

            autor.findAll().then(result => {

                const autores = result.map((result) => result.dataValues)
                console.log(autores.Name)

                editoriales.findAll().then(result => {
                    const editorial = result.map((result) => result.dataValues)

                    res.render("library/home", {
                        pageTitle: "home",
                        homeActive: true,
                        libros: libro,
                        Categoria: categorias,
                        Autor: autores,
                        Editoriales: editorial,
                        hasLibros: libro.length > 0
                    })

                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })


        }).catch(err => {
            console.log(err)
        });


        //res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
}
exports.getTipoLibros = (req, res, next) => {

    const Categoria = req.query.Tipo
    const Autor = req.query.Tipo2;
    const editorial = req.query.Tipo3
    console.log(" friltros == " + Categoria)

    const Filtro = {}

    if (Categoria && Categoria.length > 0) {
        Filtro.Categoria = Categoria;
    }


    console.log(" friltros = " + Filtro)

    libros.findAll({ where: Filtro }).then(result => {
        const libro = result.map((result) => result.dataValues)
        console.log(" Libros = " + libro)


        if (!Filtro) {
            return res.redirect('/')
        }

        categoria.findAll().then(result => {

            const categorias = result.map((result) => result.dataValues)

            autor.findAll().then(result => {

                const autores = result.map((result) => result.dataValues)
                console.log(autores.Name)

                editoriales.findAll().then(result => {
                    const editorial = result.map((result) => result.dataValues)

                    res.render("library/home", {
                        pageTitle: "home",
                        homeActive: true,
                        libros: libro,
                        Categoria: categorias,
                        Autor: autores,
                        Editoriales: editorial,
                        hasLibros: libro.length > 0
                    })

                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })


        }).catch(err => {
            console.log(err)
        });


        //res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
}

exports.getDetalles = (req, res, next) => {

    const idDetalle = req.query.AutorId;

    libros.findAll({where:{id:idDetalle}}).then(result => {
        const libro = result.map((result)=>result.dataValues)

        console.log(libro)

        res.render("library/detalle-libro", {
            pageTitle: "home",
            homeActive: true,
            libros: libro,


        })

        //res.redirect('/')
    }).catch(err => {
        console.log(err)
    })

}