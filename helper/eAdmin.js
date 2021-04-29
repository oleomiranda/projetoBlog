module.exports = {
    eAdmin: function(req, res, next){
        if(!req.user || typeof req.user == undefined || req.user == null){
            return res.redirect('/')
        }
        if(req.isAuthenticated && req.user.eAdmin == 1){
            next()
        }        
        else{
            return res.redirect('/')
        }
    }
}