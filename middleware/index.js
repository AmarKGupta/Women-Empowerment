
var   Campground      = require("../models/campground");

var middlewareobj ={};

///Middleware
middlewareobj.isloggedIn =function (req,res,next){
    if(req.isAuthenticated()){
        //req.user= "shaddam";    
        //res.locals.currentUser = req.user;
        return next();
    }
    res.redirect("/login");
}


middlewareobj.cheakCampgroundOwnership =function (req, res, next){
    if(req.isAuthenticated()){ 
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else{
                if(foundCampground.author.id.equals(req.user._id)){ 
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports=middlewareobj;