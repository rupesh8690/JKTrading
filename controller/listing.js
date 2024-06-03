const Listing = require("../models/listing");
const Category = require("../models/category");
const { listingSchema, categorySchema } = require("../schema.js");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  const allCategory= await Category.find({});
  // console.log("Categories:", allCategory);
  
  res.render("./listings/index.ejs", { allListing,allCategory});
};

module.exports.renderNewForm = async (req, res) => {
  const allCategory = await Category.find({});
  res.render("./listings/new.ejs", {allCategory});
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
   

  if (!listing) {
    req.flash("error", "Listing you are requested for does not exist!");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

  let search = req.body.listing.location;
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url," " ,filename);
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error);
  }

  //creating random product id
  let pid= Math.floor(Math.random()*9000)+1000;
  let finalPid= "JNK"+pid;

  // console.log(result);
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id; //storing current user as owner
  newListing.category=   req.body.listing.category;
  newListing.productId= finalPid;
  // Save the new listing to the database
  await newListing.save();
  req.flash("success", "New Listing created");

  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const result = await Listing.findById(id);
  if (!result) {
    req.flash("error", "Listing you are requested for does not exist!");
    res.redirect("/listings");
  }
  const allCategory= await Category.find({});
  //changing the original image with blur effect using cloudinary
  let originalImageUrl = result.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_100,w_150");
  res.render("./listings/edit.ejs", { result, originalImageUrl, allCategory});
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  //if req. vitra file x then do as follows
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");

  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
