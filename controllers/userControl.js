const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
require("../models/user")
const user = mongoose.model("user")
const passport = require("passport")
const localStrategy = require("passport-local")
require("../config/auth")(passport)

module.exports = {
    signup(req, res){
        errors = []
        user.findOne({email: req.body.email}).lean().then(User => {
            if(User){
                errors.push({text: 'Conta ja registrada'})
                res.render("user/signup", {errors: errors})
            }else{

                if(req.body.senha != req.body.senha2){
                    errors.push({text: 'As senhas não batem'})
                }
                if(req.body.senha.length < 6){
                    errors.push({text: "A senha precisa ter mais de 6 caracteres"})
                }
                if(errors.length > 0){
                    res.render("user/signup", {errors: errors})
                }else{
                    var passwordHash = bcrypt.hashSync(req.body.senha, 10) 
                    user.create({
                        name: req.body.nome,
                        email: req.body.email,
                        password: passwordHash
                    }).then(() => res.redirect("/")).catch((err) => {
                        console.log(err)
                        errors.push({text: 'Não foi possivel criar sua conta. Preencha todos os campos corretamente'})
                        res.render("user/signup", {errors: errors})
                    })
            }
            }
        })
    }
}