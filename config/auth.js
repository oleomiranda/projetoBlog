const localStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
require("../models/user")
const user = mongoose.model("user")


module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, password, done) => {
            user.findOne({email: email}, (err, User) => {
                if(err){
                    return done(err, {message: 'Houve um erro'})
                }
                if(!User){
                    return done(null, false, {message: 'Usuario não registrado'})
                }
                bcrypt.compare(password, User.password, (err, success) => {
                    if(success){
                        return done(null, User)
                    }else{
                        return done(null, false, {message: 'Senha invalida'})
                    }
                })
            })
        }))


        passport.serializeUser((User, done) => {
            done(null, User.id)
        })

        passport.deserializeUser((id, done) => {
            user.findById(id, (err, User) => {
                done(err, User)
            })
        })

}
