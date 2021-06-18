var express         = require("express");
var router          = express.Router({mergeParams:true});
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
var middleware     = require("../middleware");

router.get("/new",middleware.isloggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        
        if(err){
            console.log(err);
        }else{ 
             res.render("comments/new",{campground:campground});
        }
    })
 
})
router.post("/",middleware.isloggedIn,function(req,res){
   Campground.findById(req.params.id,function(err,campground) {
    if(err){
        console.log(err);
    }else
   
  { Comment.create(req.body.comment,function(err,comment){
    
        if(err){
            
            console.log(err);
        }else{ 
            
            //add username and id connect
            comment.author.id = req.user._id;
            comment.author.username= req.user.username;
            comment.save();
           
            //save comment
            campground.comments.push(comment);
            campground.save();
            res.redirect("/index/"+campground._id);
        }
  });
  }
    });
});

////Update Comment
router.get("/edit",function(req,res){
    
        Comment.findById(req.params.id,function(err,foundComment){
        
        if(err){
            res.redirect("/index");
        }else{
            res.render("comments/edit" , { comment : foundComment});
        }
    });
    
    
});


router.put("/",function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.comment,
                           function(err,updatedComment){
        
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/index/"+req.params.id);
        }
    });
    
});



module.exports = router;