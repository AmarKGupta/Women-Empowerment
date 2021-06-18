var mongoose  =  require("mongoose");
var skillSchema = new mongoose.Schema({

    title : String,
    video : String,
    body  : String,
    created : {type : Date , default : Date.now}
 
});
module.exports = mongoose.model("Skill",skillSchema);
