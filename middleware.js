const Listing = require("./models/listing");
const Category = require('./models/category');

const ExpressError=require("./utils/ExpressError.js");
const  { listingSchema }=require("./schema.js")

module.exports.isLoggedIn= (req,res,next)=> {
  // console.log(req.path,"..", req.originalUrl);
    if(!req.isAuthenticated()){
      //redirect url
      req.session.redirectUrl=req.originalUrl;
      req.flash("error","You must be logged for data entry!");
      return res.redirect("/login");

    }
    next();
  }

  module.exports.savedRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;

    }
    next();
  }

  module.exports.isOwner = async (req,res,next) =>{
    let {id}=req.params;

    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this item");
        return   res.redirect(`/listings/${id}`);
    }
    next();
  }

  module.exports.validateListing= (req,res,next) =>{
    let {error}= listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el) => el.message).join(",");
      throw new ExpressError(400,errMsg);
    } else{
      next();
    }
  }




