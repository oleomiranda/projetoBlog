const route = require("express").Router()
const categoryControl = require('../controllers/categoryControl')
const postControl = require('../controllers/postControl')
const {eAdmin} = require("../helper/eAdmin")

route.get("/categorias/add", eAdmin, (req, res) => {
    res.render("admin/add_categoria")
})

route.post("/categorias/add", eAdmin, categoryControl.NewCategory)

route.get("/categorias/edit/:id", eAdmin, categoryControl.GetEditCategory)

route.post("/categorias/edit", eAdmin, categoryControl.SendEditCategory)

route.post("/categorias/delete", eAdmin, categoryControl.DeleteCategory)

route.get("/categorias/", eAdmin, categoryControl.RenderCategory)

route.get("/posts", eAdmin, postControl.ControlPosts)

route.get("/posts/add", eAdmin, postControl.CreatePost)

route.post("/posts/add/", eAdmin, postControl.SendCreatePost)

route.get("/posts/edit/:id", eAdmin, postControl.EditPost)

route.post("/posts/edit", eAdmin, postControl.SendEditPost)

route.get("/posts/delete/:id", eAdmin, postControl.DeletePost)



module.exports = route;