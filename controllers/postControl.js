const mongoose = require("mongoose")
require("../models/category")
const category = mongoose.model('category')
require("../models/post")
const post = mongoose.model("post")

module.exports = {
    CreatePost(req, res){
        category.find().lean().then((Category) => {
            res.render("admin/add_post", {Category, Category})
        })
    },
    SendCreatePost(req, res){
        formfields = { //SALVA OS DADOS DO POST CADO A URL JA ESTA SENDO USADA 
            title: req.body.titulo,
            description: req.body.descricao,
            url: req.body.url,
            content: req.body.conteudo,
            category: req.body.categoria
        }
        post.findOne({url: req.body.url}).then((found) => {
            if(found){
                error = [{text: 'Essa url já esta sendo utilizada'}]
                category.find().lean().then((Category) => {
                    res.render('admin/add_post', {formfields: formfields, error: error, Category: Category})                    
                })

            }else{ //VERIFICA SE ALGUM CAMPO NAO FOI PREENCHIDO
                var errors = 0
                if(!req.body.titulo || req.body.titulo == null || typeof req.body.titulo == undefined){
                    errors += 1
                }
                if(!req.body.descricao || req.body.descricao == null || typeof req.body.descricao == undefined){
                    errors += 1
                }      
                if(!req.body.conteudo || req.body.conteudo == null || typeof req.body.conteudo == undefined){
                    errors += 1
                }
                if(!req.body.categoria || req.body.categoria == null || typeof req.body.categoria == undefined){
                    errors += 1
                }
                if(!req.body.url || req.body.url == null || typeof req.body.url == undefined){
                    errors += 1
                }
                if(errors <= 0){ //SE NAO HOUVE NENHUM ERRO CRIA O POST                                                          
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
                
                }else{ //SE ALGUM CAMPO NAO FOI PREENCHIDO MOSTRA ERRO E SALVA OS DADOS 
                    var error = [{text: 'Todos os campos prencisam ser preenchidos'}]
                    category.find().lean().then((Category) => {
                        res.render('admin/add_post', {formfields: formfields, error: error, Category: Category})                    
                    })                    
            }             
            }
        })

    },
    ControlPosts(req, res){ //PAGINA ONDE ADMIN PODE EDITAR/EXCLUIR OS POSTS  
        post.find().populate('category').lean().then((posts) => {
            res.render('admin/posts', {posts: posts})
        })
    },
    EditPost(req, res){
        post.findOne({_id: req.params.id}).populate('category').lean().then((Post) => {
            category.find().lean().then((Category) => {
                res.render('admin/edit_post', {Post: Post, Category: Category})
            })
        })
    },

    SendEditPost(req, res){
        post.findOne({_id: req.body.id}).then((Post) => {
                Post.title = req.body.titulo,
                Post.description = req.body.descricao,
                Post.content = req.body.conteudo,
                Post.url = req.body.url,
                Post.category = req.body.categoria
            
            Post.save().then(() => {
                req.flash('success_msg', 'Post foi editado')
                res.redirect('/admin/posts')
            })
        
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao tentar editar este post')
            res.redirect('/admin/posts')
        })
        
    },
    DeletePost(req, res){
        post.findOne({_id: req.params.id}).then((Post) => {
            if(Post){
                post.remove({_id: Post._id}).then(() => {
                req.flash('success_msg', 'Post excluido com sucesso')
                res.redirect('/admin/posts')})
            }else{
                req.flash('error_msg', 'Houve um erro ao tentar excluir o post')
                res.redirect('/admin/posts')
            }
        })
    }
}