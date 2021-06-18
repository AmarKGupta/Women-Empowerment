var   express         = require("express");
var   router          = express.Router();
var   Health      = require("../models/health");
var   middleware     = require("../middleware");





router.get("/indexhealth",function(req,res){
    
      Health.find({},function(err,healths){
       
       if(err){
           console.log(err);
       } else {
         
           res.render("health/index",{healths: healths});
       }
   });
});

router.get("/indexhealth/new",function(req,res){
   
    res.render("health/new"); 
});

router.post("/indexhealth",function(req,res){
    console.log(req.body.health)
     Health.create(req.body.health,function(err,newhealth){
       
       if(err){
           res.render("health/new");
       }else{
           res.redirect("/indexhealth");
       }
   }) ;
});

router.get("/indexhealth/:id",function(req,res){
    
       Health.findById(req.params.id,function(err,foundhealth){
        
        if(err){
            res.redirect("/indexhealth");
        }else{
            res.render("health/show" , { health : foundhealth});
        }
 });
    
    
});

router.get("/indexhealth/:id/edit",function(req,res){
    
        Health.findById(req.params.id,function(err,foundhealth){
        
        if(err){
            res.redirect("/indexhealth");
        }else{
            res.render("health/edit" , { health : foundhealth});
        }
    });
    
    
});

//Update Route
router.put("/indexhealth/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/blogs/"+req.params.id);
        }
    });
    
});

router.delete("/indexhealth/:id",function(req,res){
    
    Health.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/indexhealth");
        }else{
            res.redirect("/indexhealth");
        }
    })
})

module.exports = router;

