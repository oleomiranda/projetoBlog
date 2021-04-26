const route = require("express").Router()
const categoryControl = require('../controllers/categoryContol')

route.get("/categorias/add", (req, res) => {
    res.render("admin/add_categoria")
})

route.post("/categorias/add", categoryControl.NewCategory)

route.get("/categorias/edit/:id", categoryControl.GetEditCategory)

route.post("/categorias/edit", categoryControl.SendEditCategory)

route.post("/categorias/delete", categoryControl.DeleteCategory)

route.get("/categorias/", categoryControl.RenderCategory)

route.get("/posts", (req, res) => {
    res.render("admin/posts")
})

route.get("/posts/add", (req, res) => {
    res.render("admin/add_post")
})

route.patch("/posts/:url", (req, res) => {
    
})

route.get("/post/:url", (req, res) => {
    res.render("admin/post_unico")
})

module.exports = route;