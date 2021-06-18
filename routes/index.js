var express         = require("express");
var router          = express.Router();
var passport        = require("passport");
var User            = require("../models/user");

  
router.get("/",function(req,res){
    
    res.render("landing");
});

router.get("/profileuser",function(req,res){
    res.render("profile",{currentUser : req.user});
})
//============================================
//    AUTH ROUTE
//================================================= 
router.get("/register",function(req,res){
    res.render("register");
})
router.post("/register",function(req,res){
    var username = req.body.username;
    var mobile = req.body.mobile;
    var martial  =  req.body.martial;
    
    var emailId = req.body.emailId;
    var aadhar = req.body.aadhar;

    var Qualification = req.body.Qualification;
    var Skill = req.body.Skill
    console.log(req.body);
    var newUser = new User({username:username  ,mobile :mobile , martial : martial, 
        emailId : emailId , aadhar: aadhar, Qualification:Qualification, Skill: Skill
    });
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/index");
        })
      
    })
})



//=========================================================
//    LOGIN ROUTE
//=========================================================
router.get("/login",function(req,res){
    res.render("login");
})
router.post("/login",
         passport.authenticate("local",
         {successRedirect: "/index",failureRedirect:"/login"})  ,
         function(req,res){
   
})

//    logout route

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/index");
})


module.exports = router;