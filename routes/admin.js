const route = require("express").Router()

route.get("/categoria/add", (req, res) => {
    res.render("admin/add_categoria")
})



route.get("/categorias/", (req, res) => {
    res.render("/categorias/index")
})

route.delete("/categoria/:id", (req, res) => {
    
})

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