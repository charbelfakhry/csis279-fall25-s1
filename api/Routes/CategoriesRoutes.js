const express = require("express");
const router = express.Router();

const categoryController = require("../Controllers/CategoryController");

const { CategoryValidation } = require("../Validators/CategoryValidator");

// GET ROUTES
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:categoryId", categoryController.getCategoryById);

// POST ROUTES
router.post("/categories", categoryController.createCategory, CategoryValidation);

// PUT ROUTES
router.put("/categories/:categoryId", categoryController.updateCategory, CategoryValidation);

// DELETE ROUTES
router.delete("/categories/:categoryId", categoryController.deleteCategory);

module.exports = router;
