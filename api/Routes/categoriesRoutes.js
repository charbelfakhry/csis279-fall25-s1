const express = require("express");
const router = express.Router();

const {
  getAllCategoriesController,
  getCategoryByIdController,
  createNewCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/CategoryController");

const { CategoryValidation } = require("../Validators/category-validator");

// GET ROUTES
router.get("/categories", getAllCategoriesController);
router.get("/categories/:id", getCategoryByIdController);

// POST ROUTES
router.post("/categories", createNewCategoryController, CategoryValidation());

// PUT ROUTES
router.put("/categories/:id", updateCategoryController, CategoryValidation());

// DELETE ROUTES
router.delete("/categories/:id", deleteCategoryController);

module.exports = router;
