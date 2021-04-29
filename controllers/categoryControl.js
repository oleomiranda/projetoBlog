const mongoose = require('mongoose')
require("../models/category")
const category = mongoose.model('category')
require("../models/post")
const post = mongoose.model('post')
module.exports = {
    NewCategory(req, res){
    category.findOne({name: req.body.nome}).then((Category) => {
        if(Category){
            req.flash('error_msg', 'Essa categoria ja existe')
            res.redirect('/admin/categorias/add')
        }else{
            category.create({
                name: req.body.nome
            }).then(() => {
                req.flash('success_msg', 'Categoria criada com sucesso')
                res.redirect('/admin/categorias')
            })
        }
    })
    },

    GetEditCategory(req, res){
    category.findOne({_id: req.params.id}).lean().then((categoria) => {
        console.log(categoria)
        res.render("admin/edit_categorie", {categoria: categoria})
    })
    
    },

    SendEditCategory(req, res){
    category.findOne({_id: req.body.id}).then((categoria) => {
        console.log(categoria)
        categoria.name = req.body.nome
        categoria.save().then(() => {
            req.flash('success_msg', 'Categoria editada com sucesso')
            res.redirect('/admin/categorias')
        })
        }).catch((err) => {
            console.log('O ERRO FOI => ', err)
            req.flash('error_msg', 'Houve um erro ao editar a categoria')
            res.redirect('/admin/categorias')
    })
    },

    DeleteCategory(req, res){
    category.deleteOne({_id: req.body.id}).then(() => {
        req.flash('sucess_msg', 'Categoria removida com sucesso')
        res.redirect("/admin/categorias")
    })
    },

    RenderCategory(req, res){  //PAGINA ONDE ADMIN PODE EDITAR/EXCLUIR AS CATEGORIAS  
    category.find().lean().then((categoria) => {
        res.render("admin/control_categories", {categoria: categoria})
    })
    
    },
    index(req, res){
        category.find().lean().then((categoria) => {
            res.render("categories/index", {categoria: categoria})
        })
    },
    findPosts(req, res){
        category.findOne({name: req.params.name}).lean().then((Category) => {
            if(Category){
                post.find({category: Category._id}).lean().then((Post) => {
                    res.render('categories/posts', {post: Post, Category: Category})
                })
            }else{
                res.render('categories/posts')
            }
        })
    }
} 