const Listing = require("../models/listing");

module.exports.search = async (req, res, next) => {
  try {
    let { q } = req.query;
    const searchedList = await Listing.find({
      $or: [
        { keywords: { $regex: q, $options: 'i' } },
        { productId: { $regex: q, $options: 'i' } }
      ]
    });
    
    if (searchedList.length === 0) {
      req.flash("error", "No records found!");
      return res.redirect("/listings");
    }
    res.render('./listings/search', { searchByCategory: [], searchedList, successMsg: req.flash('success') });
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
};

module.exports.searchCategory = async (req, res, next) => {
  try {
    let { id } = req.params;
    const searchByCategory = await Listing.find({ category: id });
    if (searchByCategory.length === 0) {
      req.flash("error", "No records found!");
      return res.redirect("/listings");
    }
    res.render('./listings/search', { searchByCategory, searchedList: [], successMsg: req.flash('success') });
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
};
