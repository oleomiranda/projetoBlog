const mongoose = require("mongoose")
require("../models/user")
const user = mongoose.model("user")
module.exports = {
    signup(req, res){
        errors = []
        user.findOne({email: req.body.email}).lean().then(User => {
            if(User){
                errors.push({texto: 'Conta ja registrada'})
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
                    user.create({
                        name: req.body.nome,
                        email: req.body.email,
                        password: req.body.senha
                    }).then(() => res.redirect("/")).catch((err) => {
                        console.log(err)
                        erros.push({texto: 'Não foi possivel criar sua conta'})
                        res.redirect("/404")
                    })
            }
            }
        })
    },
    login(req, res){
        
    }
}