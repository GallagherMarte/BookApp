const Categorias = require('../models/Categorias')

exports.getcategoriasList = (req,res,next)=>{
    Categorias.findAll().then(result =>{

        const categoria = result.map((result)=>result.dataValues)

        res.render("categoria/categoria-list",{
            pageTitle: "categorias",
            CategoriaActive: true,
            Categoria: categoria,
            hasLibros: categoria.length > 0
        })
    }).catch(err =>{
        console.log(err)
    })
}
exports.getCreateCategoris = (req,res,next)=>{
    res.render("categoria/save-categoria",{
        pageTitle: "categorias",
        CategoriaActive: true,
        EditMode: false
    })
}
exports.postCreateCategoris = (req,res,next)=>{
    const Nombre = req.body.Nombre;
    const descriccion = req.body.descriccion
    

    Categorias.create({
        Nombre: Nombre,
        Descripcion: descriccion,
       

    }).then(result => {
        res.redirect('/Categoria-list')
    }).catch(err => {
        console.log(err)
    })
}
exports.getEditcategorias = (req,res,next)=>{
    const edit = req.query.edit
    const Categoria = req.params.CategoriaID;

    if (!edit) {
        return res.redirect('/')
    }

    Categorias.findOne({where: {Id: Categoria} })
    .then(result=>{
        const categoria = result.dataValues;

        if(!categoria){
            return res.redirect('/Categoria-list');
        }
        res.render("Categoria/save-categoria", {
        pageTitle: "Region",
        regionActive: true,
        editMode: edit,
        Categoria: categoria

    })
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.postEditCategoria = (req,res,next)=>{
    const Nombre = req.body.Nombre;
    const descriccion = req.body.descriccion
    const Categoria = req.body.CategoriaID;
    

    Categorias.update({
        Nombre: Nombre,
        Descripcion: descriccion,
       

    },{where:{Id:Categoria}}).then(result => {
        res.redirect('/Categoria-list')
    }).catch(err => {
        console.log(err)
    })
}
exports.PostDeletecategorias = (req, res, next) => {

    const Categoria = req.body.CategoriaID;

    Categorias.destroy({where: {id: Categoria}})
    .then(result => {
        res.redirect('/Categoria-list')
    }).catch(err => {
        console.log(err)
    })
  
}