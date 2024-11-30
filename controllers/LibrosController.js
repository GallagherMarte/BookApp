const libros = require('../models/libros')
const categoria = require('../models/Categorias')
const autor = require('../models/Autores')
const editoriales = require('../models/editorial')
//const { where } = require('sequelize')
const transporter = require('../services/EmailServices')
const Editorial = require('../models/editorial')



exports.getlibroslist = (req, res, next) => {
    libros.findAll({
        include:
        {
            model: autor
        }

    }).then(result => {

        const libro = result.map((result) => result.dataValues)



        res.render("library/libros-list", {
            PageTitle: "libros",
            homeActive: true,
            Libros: libro,
            hasLibros: libro.length > 0
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getCreateLibros = (req, res, next) => {


    categoria.findAll().then(result => {

        const categorias = result.map((result) => result.dataValues)

        autor.findAll().then(result => {

            const autores = result.map((result) => result.dataValues)
            console.log(autores.Name)

            editoriales.findAll().then(result => {
                const editorial = result.map((result) => result.dataValues)

                res.render("library/save-libros", {
                    pageTitle: "Libros",
                    homeActive: true,
                    editMode: false,
                    Categoria: categorias,
                    autor: autores,
                    editorial: editorial,
                    hascategorias: categorias.length > 0,
                    hasAutor: autores.length > 0,
                    hasEditorial: editorial.length > 0
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

exports.PostCreteLibros = (req, res, next) => {
    const titulo = req.body.Titulo
    const ano = req.body.anoPublic

    const imagen = req.file;

    const categoria = req.body.Categoris
    const Autor = req.body.authores
    const editorial = req.body.editorial;
    const LibrosAutor = req.body.authores


    autor.findByPk(LibrosAutor).then(result => {


        if (!result) {
            res.redirect('/')

        }

        const NombreAutor = result.Nombre;
        console.log(NombreAutor)

        if (!imagen) {
            return res.redirect("/Libros-list")
        }

        console.log(req.file.path)
        console.log(req.file)
        if (!imagen) {
            return res.status(400).send('No se ha proporcionado ninguna imagen');
        }
        console.log("Id Autor"+LibrosAutor)

        libros.create({
            Titulo: titulo,
            AñoPublicacion: ano,
            imagenLibro: "/" + imagen.path, //  imagen/imagen.jpg
            Categoria: categoria,
            Autor: NombreAutor,
            Editorial: editorial,
            AuthorId: LibrosAutor
        }).then(result => {
            res.redirect('/')
            autor.findOne({ where: { Nombre: Autor } }).then(autor => {
                //console.log(autor)

                return transporter.sendMail({
                    from: "libros notification",
                    to: autor.Correo,
                    subject: `welco ${titulo}`,
                    html: `<p>Hola <strong>${autor.Nombre}</strong>,</p>
                   <p>Se ha publicado un nuevo libro de tu autoría titulado "<strong>${titulo}</strong>".</p>
                   <p>Gracias por colaborar con nosotros.</p>`
                }, (err) => {
                    console.log(err);
                })
            }).catch(err => { console.log(err) })
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getEditLibros = (req, res, next) => {
    const edit = req.query.edit
    const libroId = req.params.LibrosId

    if (!edit) {
        return res.redirect('/')
    }

    libros.findOne({ where: { Id: libroId } }).then(result => {
        const libro = result.dataValues;
        if (!libros) {
            return res.redirect('/Libros-list')
        }

        categoria.findAll().then(result1 => {

            const categorias = result1.map((result1) => result1.dataValues)
            console.log(categoria)

            autor.findAll().then(result2 => {

                const autores = result2.map((result2) => result2.dataValues)
                console.log(autores)

                editoriales.findAll().then(result3 => {
                    const editorial = result3.map((result3) => result3.dataValues)

                    console.log(editorial)
                    res.render("library/save-libros", {
                        pageTitle: "Libros",
                        homeActive: true,
                        editMode: true,
                        Libros: libro,
                        Categoria: categorias,
                        autor: autores,
                        editorial: editorial,
                        hascategorias: categorias.length > 0,
                        hasAutor: autores.length > 0,
                        hasEditorial: editorial.length > 0
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
    }).catch(err => {
        console.log(err)
    })
}
exports.PostEditlibros = (req, res, next) => {
    const titulo = req.body.Titulo
    const ano = req.body.año
    const imagen = req.file;
    const categoria = req.body.Categoris
    const Autor = req.body.authores
    const editorial = req.body.editorial
    const Cateid = req.body.LibrosId

    const LibrosAutor = req.body.authores

    console.log("LibrosAutor (ID del autor): " + LibrosAutor);  


    autor.findByPk(LibrosAutor).then(result1 => {

        libros.findOne({ where: { Id: Cateid } }).then(result => {
            if (!result1) {
                console.log("No author found with ID: " + LibrosAutor);
                return res.redirect('/'); // Redirect if no author was found
            }
    
            // Get the author's name
            const NombreAutor = result1.Nombre;


            console.log("-->"+NombreAutor)

            console.log("-->"+Cateid)

            const libro = result.dataValues;
            if (!libros) {
                return res.redirect('/Libros-list')
            }

            const img = imagen ? "/" + imagen.path : libro.imagenLibro; //oprrador ternario

            libros.update({
                Titulo: titulo,
                AñoPublicacion: ano,
                imagenLibro: img,
                Categoria: categoria,
                Autor: NombreAutor,
                Editorial: editorial,
                AuthorId: LibrosAutor
                
            }, { where: { Id: Cateid } })
                .then(result => {
                    res.redirect('/Libros-list')
                }).catch(err => {
                    console.log(err)
                })



        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })


}
exports.Postdeletelibros = (req, res, next) => {
    const librosID = req.body.LibrosId;
    console.log("id " + librosID)

    libros.destroy({ where: { Id: librosID } })
        .then(result => {
            res.redirect('/Libros-list')
        }).catch(err => {
            console.log(err)
        })
}