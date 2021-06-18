var   express         = require("express");
var   router          = express.Router();
var   Skill           = require("../models/skill");
var   middleware      = require("../middleware");





router.get("/indexskill",function(req,res){
    
    Skill.find({},function(err,skills){
       
       if(err){
           console.log(err);
       } else {
         
           res.render("skill/index",{skills: skills});
       }
   });
});

router.get("/indexskill/new",function(req,res){
   
    res.render("skill/new"); 
});

router.post("/indexskill",function(req,res){
    console.log(req.body.skill)
    Skill.create(req.body.skill,function(err,newskill){
       
       if(err){
           res.render("skill/new");
       }else{
           res.redirect("/indexskill");
       }
   }) ;
});

router.get("/indexskill/:id",function(req,res){
    
    Skill.findById(req.params.id,function(err,foundskill){
        
        if(err){
            res.redirect("/indexskill");
        }else{
            res.render("skill/show" , { skill: foundskill});
        }
 });
    
    
});

router.get("/indexskill/:id/edit",function(req,res){
    
    Skill.findById(req.params.id,function(err,foundskill){
        
        if(err){
            res.redirect("/indexskill");
        }else{
            res.render("skill/edit" , { skill: foundskill});
        }
    });
    
    
});

//Update Route
router.put("/indexskill/:id",function(req,res){
    Skill.findByIdAndUpdate(req.params.id,req.body.skill,function(err,updatedSkill){
        
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/indexskill/"+req.params.id);
        }
    });
    
});

router.delete("/indexskill/:id",function(req,res){
    
    Skill.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/indexskill");
        }else{
            res.redirect("/indexskill");
        }
    })
})

module.exports = router;

