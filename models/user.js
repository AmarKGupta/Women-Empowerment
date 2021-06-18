  
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({


    username: String,
    martial :String,
    mobile : String,
    emailId :String,
    aadhar:String,
    Qualification :String,
    Skill :String,
    password: String
    /* username: {
        type: String,
        required: true,
      }, 
      Martial_status:{
         type:String,
         required:true,
         unique:true
      },
       mobile:{
         type:String,
         required:true,
         unique:true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      Aadhar:{
         type:String,
         required:true,
         unique:true
      },
      Qualification:{
         type:String,
         required:true
      },
      skill:{
         type:String,
         required:true
      },
      mobile: {
          type: Number,
          required: true
      },
      password: {
        type: String,
        required: true
      }*/
    
});

UserSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", UserSchema);