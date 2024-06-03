const Contact = require("../models/contact");
const Category = require("../models/category");
const { listingSchema, categorySchema, contactSchema} = require("../schema.js");
module.exports.createContact = async(req,res) =>{
        // Validate request body with Joi
        const result = contactSchema.validate(req.body);
        if (result.error) {
          // Extract the first validation error message
          throw new ExpressError(400, result.error.details[0].message);
        }
        
        // Create a new Contact instance
        const newContact = new Contact(req.body);
        
        // Save the new contact to the database
        await newContact.save();
        
        // Flash success message
        req.flash('success', 'We will contact you soon');
        
        // Redirect to the desired page
        res.redirect('/listings');
}

module.exports.inquiries= async(req,res) => {
    let inquiries = await Contact.find({});
    if (!inquiries) {
      req.flash("error", "No inquiries !");
      res.redirect("/listings");
    }
    res.render("./contact/inquiries.ejs", {inquiries});
}

module.exports.deleteInquiries= async(req,res) =>{
    let {id} =req.params;
    await Contact.findByIdAndDelete(id);
    req.flash("success","Inquiry Deleted");
    res.redirect("/contact/inquiries");
}