var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description:"A campsite or camping pitch is a place used for overnight stay in an outdoor area. ... In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description:"A campsite or camping pitch is a place used for overnight stay in an outdoor area. ... In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description:"A campsite or camping pitch is a place used for overnight stay in an outdoor area. ... In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
     if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}
module.exports = seedDB;