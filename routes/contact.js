const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const { listingSchema, reviewSchema, contactSchema } = require("../schema.js");
const contactController = require("../controller/contact.js");
 
// Route to create a contact
router.post("/", wrapAsync(contactController.createContact));

// Route to get inquiries
router.get("/inquiries", isLoggedIn, wrapAsync(contactController.inquiries));

// Route to delete an inquiry by ID
router.get("/:id/delete", isLoggedIn, wrapAsync(contactController.deleteInquiries));

module.exports = router;