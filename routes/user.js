const route = require('express').Router()
const mongoose = require("mongoose")
require("../models/user")
const user = mongoose.model("user")
const userController = require("../controllers/userControl")

route.get("/signup", (req, res) => {
    res.render("user/signup")
})

route.post("/user/signup", userController.signup)
  

route.get("/login", (req, res) => {
    res.render("user/login")
})

route.post("/login", (req, res) => {

})

module.exports = route;