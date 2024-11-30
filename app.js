const path = require("path") //para el public 
const express = require("express");
const {engine} = require("express-handlebars");
const sequelize = require("./util/dataBase");
const libro = require('./models/libros')
const Autor = require('./models/Autores')
const categoria = require('./models/Categorias')
const Editorial = require('./models/editorial')


//controladores

const errorController = require('./controllers/ErrorController')

//rutas
const homeRouter = require('./Routes/homeR')
const LibrosRouter = require('./Routes/librosR')
const  AutorRouter = require('./Routes/Autor')
const categoriaRouter = require('./Routes/categoriaR')
const EditorialRouter = require('./Routes/editorialR')
const multer = require("multer")
const {v4: uuidv4} = require("uuid");

//inciciar Express

const app = express();

//comfiguracion de hbs como motor de plantillas
app.engine("hbs",
    engine({
        layoutsDir: "views/layouts",
        defaultLayout: "main-layouts",
        extname: "hbs"
    })
);

app.set("view engine", "hbs");
app.set("views","views");

//Middlewares de Express

app.use(express.urlencoded({extended: false}))



const imageStorage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>
        cb(null,`${uuidv4()}-${file.originalname}`)
})

app.use(multer({storage: imageStorage}).single('Imagen')) 


//usar rutas de la app

app.use(homeRouter)
app.use(LibrosRouter)
app.use(AutorRouter)
app.use(categoriaRouter)
app.use(EditorialRouter)


// Archivos estáticos/configuracion de public 




app.use(express.static(path.join(__dirname,"public")))
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use(express.static(path.join(__dirname,"images")))


//manejo de error

app.use(errorController.get404);

//sincronisa la base de datos y levanta el servidor

libro.belongsTo(Autor,{constraints: true,onDelete:"CASCADE"});
Autor.hasMany(libro)

sequelize.sync(/*{alter:true}*/).then(result =>{
    console.log("ok")
    app.listen(3010);

}).catch(err=>{
    console.log(err)
})

