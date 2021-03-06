const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const path = require('path')
const mongoose = require("mongoose")
const flash = require("connect-flash")
const session = require("express-session")
const userroute = require("./routes/user")
const adminroute = require("./routes/admin")
const categoryContol = require("./controllers/categoryControl")
const indexControl = require("./controllers/indexPageControl")
const passport = require('passport')

 
mongoose.connect('mongodb://localhost/blog', ({useNewUrlParser: true, useUnifiedTopology: true}))

app.use(session({
    secret:'bodinho',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg')
    res.locals.success_msg = req.flash('success_msg')
    res.locals.user = req.user
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname,'public')))


app.use("", userroute)
app.use("/admin", adminroute)

app.get("/", indexControl.renderPosts)

app.get("/categorias", categoryContol.index)

app.get("/categorias/:name", categoryContol.findPosts)

app.get("/posts/:url", indexControl.findPost)


app.get("/404", (req, res) => {
    res.send('<img src="https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png">')
})


app.listen(8081, () => console.log('RODANDO....'))