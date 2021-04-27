const mongoose = require("mongoose")
require("../models/category")
const category = mongoose.model('category')
require("../models/post")
const post = mongoose.model("post")

module.exports = {
    createPost(req, res){
        category.find().lean().then((Category) => {
            res.render("admin/add_post", {Category, Category})
        })
    },
    sendCreatePost(req, res){
        formfields = {
            title: req.body.titulo,
            description: req.body.descricao,
            content: req.body.conteudo,
            category: req.body.categoria
        }
        post.findOne({url: req.body.url}).then((found) => {
            if(found){
                error = [{text: 'Esta url ja esta sendo utilizada'}]
                category.find().lean().then((Category) => {
                    res.render('admin/add_post', {formfields: formfields, error: error, Category: Category})                    
                })

            }else{
                post.create({
                    title: req.body.titulo,
                    description: req.body.descricao,
                    content: req.body.conteudo,
                    url: req.body.url,
                    category: req.body.categoria
                }).then(() => {
                    req.flash('success_msg', 'Post criado com sucesso')
                    res.redirect('/')
                })                
            }
        })

    }
}