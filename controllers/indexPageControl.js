const mongoose = require("mongoose")
require("../models/post")
const post = mongoose.model("post")

module.exports = {
    renderPosts(req, res){ //PAGINA INICIAL MOSTRANDO OS POSTS EM ORDEM PELA DATA 
    post.find().populate('category').lean().sort({date: 'desc'}).then((Post) => {
        res.render('public/index', {post: Post})
    })
    
},
    findPost(req, res){
        post.findOne({url: req.params.url}).populate('category').lean().then((Post) => {
            res.render('admin/single_post', {post: Post})
        })
    }
}