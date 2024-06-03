
const express = require('express');
const router = express.Router();
const searchController = require('../controller/search');

router.get("/", searchController.search)
// Route for search by category with dynamic parameter :id
router.get("/:id", searchController.searchCategory);

module.exports = router;
