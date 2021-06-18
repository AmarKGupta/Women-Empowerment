var   express         = require("express");
var   router          = express.Router();
var   Law     = require("../models/law");
var   middleware     = require("../middleware");





router.get("/indexlaw",function(req,res){
    
    Law.find({},function(err,laws){
       
       if(err){
           console.log(err);
       } else {
         
           res.render("law/index",{laws: laws});
       }
   });
});

router.get("/indexlaw/new",function(req,res){
   
    res.render("law/new"); 
});

router.post("/indexlaw",function(req,res){
    console.log(req.body.law)
    Law.create(req.body.law,function(err,newlaw){
       
       if(err){
           res.render("law/new");
       }else{
           res.redirect("/indexlaw");
       }
   }) ;
});

router.get("/indexlaw/:id",function(req,res){
    
    Law.findById(req.params.id,function(err,foundlaw){
        
        if(err){
            res.redirect("/indexlaw");
        }else{
            res.render("law/show" , { law : foundlaw});
        }
 });
    
    
});

router.get("/indexlaw/:id/edit",function(req,res){
    
    Law.findById(req.params.id,function(err,foundlaw){
        
        if(err){
            res.redirect("/indexlaw");
        }else{
            res.render("law/edit" , { law : foundlaw});
        }
    });
    
    
});

//Update Route
router.put("/indexlaw/:id",function(req,res){
    Law.findByIdAndUpdate(req.params.id,req.body.law,function(err,updatedLaw){
        
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/indexlaw/"+req.params.id);
        }
    });
    
});

router.delete("/indexlaw/:id",function(req,res){
    
    Law.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/indexlaw");
        }else{
            res.redirect("/indexlaw");
        }
    })
})

module.exports = router;

