const mongoose = require('mongoose')
const Schema = mongoose.Schema
const post = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String, 
        required: true
    },
    url:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    }

})

module.exports = mongoose.model("post", post)