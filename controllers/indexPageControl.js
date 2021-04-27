const mongoose = require("mongoose")
require("../models/post")
const post = mongoose.model("post")

module.exports = {
    renderPosts(req, res){
    post.find().populate('category').lean().then((Post) => {
        res.render('public/index', {post: Post})
    })
    
},
    findPost(req, res){
        post.findOne({url: req.params.url}).populate('category').lean().then((Post) => {
            res.render('admin/post_unico', {post: Post})
        })
    }
}