const route = require('express').Router()
const mongoose = require("mongoose")
require("../models/user")
const user = mongoose.model("user")
const userController = require("../controllers/userControl")
const passport = require('passport')

route.get("/signup", (req, res) => {
    res.render("user/signup")
})

route.post("/user/signup", userController.signup)
  

route.get("/login", (req, res) => {
    res.render("user/login")
})

route.post("/login", (req, res, next) => {
    passport.authenticate('local', {
       failureRedirect: '/404',
       successRedirect: '/',    
       failureFlash: true
    })(req, res, next)
})


module.exports = route;