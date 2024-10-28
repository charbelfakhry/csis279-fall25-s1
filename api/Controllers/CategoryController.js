const { createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory, } = require("../Services/CategoriesService");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      const category = await createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await getCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const [updatedCount] = await updateCategory(
        categoryId,
        name
      );

      if (updatedCount === 0) {
        return res
          .status(404)
          .json({ message: "Category not found or no update needed" });
      }
      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const deleted = await deleteCategory(categoryId);

      if (!deleted) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryController;
