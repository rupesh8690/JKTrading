const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const categoryController = require("../controller/category");

router.post(
  "/",
  isLoggedIn,
  categoryController.insertCategory
);

router.get("/view",isLoggedIn,wrapAsync(categoryController.viewCategory));

router.put("/:id/:newCategory",isLoggedIn,wrapAsync(categoryController.editCategory));

router.get("/:id/delete", isLoggedIn,wrapAsync(categoryController.deleteCategory));

module.exports = router;
