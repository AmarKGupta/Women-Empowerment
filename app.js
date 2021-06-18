var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var bodyParser      = require("body-parser");
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");
var User            = require("./models/user");
var health            = require("./models/health");
var seedDB          = require("./seeds");
var methodOverride  = require("method-override");
var middleware      = require("./middleware");
var commentRoute    = require("./routes/comments");
var  campgroundRoute      = require("./routes/campgrounds");
var  indexRoute           = require("./routes/index");
var  indexhealthRoute     =  require("./routes/indexhealth");
var  indexlawRoute     =  require("./routes/indexlaw");
var  indexskillRoute     =  require("./routes/indexskill");
mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
//seedDB();

//================================================
//       PASSPORT CONFIGURATION
//================================================

app.use(require("express-session")({
    
    secret: "WEB DEVLOPMENT",
    resave: false,
   saveUnintialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*var campgroundSchema = new mongoose.Schema({
    
    name: String,
    image: String
});

var Campground = mongoose.model("Campground",campgroundSchema);*/
/*Campground.create({
   
    name:  "Rehaan" ,
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2m_zVRcBek-tyhqM38-FzbYHYTr4oyJ8joFHx_n9paONIeZr5&s"

},  function(err, campground)
   { 
    
    if(err){
        
        console.log(err);
    } else{
        
        console.log("NEWLY CREATED CAMPGROUND");
        console.log(campground);
    }
})*/
  
require('./routespaytm')(app);
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    if(res.locals.currentUser)
    console.log(res.locals.currentUser);
    next();
});

app.use(indexRoute);
app.use("/index",campgroundRoute);
app.use("/index/:id/comments",commentRoute);
app.use(indexhealthRoute);
app.use(indexlawRoute);
app.use(indexskillRoute);  

app.listen(8000,function(){ 
 
 console.log("Campground server has strated");
    
});

