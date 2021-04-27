const route = require("express").Router()
const categoryControl = require('../controllers/categoryControl')
const postControl = require('../controllers/postControl')

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

route.get("/posts/add", postControl.createPost)

route.post("/posts/add/", postControl.sendCreatePost)



module.exports = route;