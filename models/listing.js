const mongoose=require("mongoose");
const Schema=mongoose.Schema; // instead of writing mongoose.shcema now we can use Schema only


const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        // type:String,
        // default:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        // //if user dont enter image then
        // set: (v) => v==""?"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v, //setting default image if user nott enter

        url:String,
        filename:String,
    },

    price:Number,
    status:String,
    keywords:[String], // array of string
    owner: {
        type: Schema.Types.ObjectId,
        ref:"User", // it refers to the registered user
        
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category' // This refers to the Category model
    
    },
    productId:String,

});


const Listing=mongoose.model("Listing",listingSchema);
module.exports = Listing;
 // exporting module to app.js

