module.exports  = {
    authentication: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', 'Please login or register to access this page');
            res.redirect('/users/login');
        }
    } 
}