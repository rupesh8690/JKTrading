const Category = require("../models/category");
const { categorySchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

module.exports.insertCategory = async (req, res, next) => {
  const { title } = req.body;
  
  const result = categorySchema.validate({ category: { category: title } });
  if (result.error) {
    throw new ExpressError(result.error.message, 400);
  }

  const newCategory = new Category({ category: title });
  await newCategory.save();

  req.flash("success", "New Category created");
  res.redirect("/listings");
};

module.exports.viewCategory= async(req,res) =>{
  let categories_result= await Category.find({});
  if (!categories_result) {
    req.flash("error", "No Categories");
    res.redirect("/listings");
  }
  res.render("./category/category.ejs", {categories_result});
}

module.exports.editCategory = async(req,res) =>{
  const { id, newCategory } = req.params;
    
    let updatedCategory= await Category.findByIdAndUpdate(id,{category: newCategory});

    req.flash("success", "Category Updated!");

    res.redirect("/category/view");

}

module.exports.deleteCategory = async(req,res) =>{
  let {id} =req.params;
  let deletCategory= await Category.findByIdAndDelete(id,{category : id});
  req.flash("success","Category Deleted");
  res.redirect("/category/view");
}