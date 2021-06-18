var mongoose  =  require("mongoose");
var lawSchema = new mongoose.Schema({

    title : String,
   
    body  : String,
    created : {type : Date , default : Date.now}
 
});
module.exports = mongoose.model("Law",lawSchema);