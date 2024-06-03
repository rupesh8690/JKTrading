const mongoose=require("mongoose");
const Schema=mongoose.Schema; // instead of writing mongoose.shcema now we can use Schema only


const categorySchema=new Schema({
    category:{
        type:String,
        required:true
    }
});


const Category=mongoose.model("Category",categorySchema);
module.exports = Category;
 // exporting module to app.js

