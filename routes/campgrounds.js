var   express         = require("express");
var   router          = express.Router();
var   Campground      = require("../models/campground");
var   Comment         = require("../models/comment");
var   middleware     = require("../middleware");

    
 router.get("/",function(req,res){
    
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    });
    
   
});

 router.get("/new",middleware.isloggedIn,function(req,res){
    res.render("campgrounds/new");
})


 router.post("/",function(req,res){
    
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc  =  req.body. description;
   var author= {
        id:req.user._id,
        username:req.user.username
    }
    var newCampground = { name:name ,price:price, image:image, description:desc,author:author };
    
    Campground.create(newCampground,function(err,nwelyCreated){
   
        if(err){
            
            console.log(err);
        }else{
            
            res.redirect("/index");
        }
    
    });
    
});

 router.get("/:id",middleware.isloggedIn,function(req,res){
      console.log(req.params.id);
      
      //res.locals.currentUser=req.user;
     Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        
        if(err){
               console.log(err);
        }else{ 
        
            console.log(campground);
            res.render("campgrounds/show" , { campground : campground});
        
                }
});
});

////Update Campground
router.get("/:id/edit",middleware.cheakCampgroundOwnership,function(req,res){
    
        Campground.findById(req.params.id,function(err,foundCampground){
        
        if(err){
            res.redirect("/index");
        }else{
            res.render("campgrounds/edit" , { campground : foundCampground});
        }
    });
    
    
});


router.put("/:id",middleware.cheakCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,
                           function(err,updatedCampground){
        
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/index/"+req.params.id);
        }
    });
    
});

//Destroy of campground
router.delete("/:id",middleware.cheakCampgroundOwnership,function(req,res){
    
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/index");
        }else{
            res.redirect("/index");
        }
    })
})



module.exports = router;