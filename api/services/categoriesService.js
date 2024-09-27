import Category from "../models/categories";

const createCategory = async (name) => {
    try {
        const newCategory = await Category.create({
            category_name: name,
        });

        return newCategory.toJSON();
    } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Failed to create category');
    }
};

const getAllCategories = async () => {
    try {
        const categories = await Category.findAll();
        return categories.map(category => category.toJSON());
    } catch (error) {
        console.error('Error retrieving categories:', error);
        throw new Error('Failed to retrieve categories');
    }
};

const getCategoryById = async (id) => {
    try {
        const category = await Category.findByPk(id);
        if (category) {
            return category.toJSON();
        }
        return "Category not found";
    } catch (error) {
        console.error('Error retrieving category by ID:', error);
        throw new Error('Failed to retrieve category');
    }
};

const updateCategory = async (id, name) => {
    try {
        const updated = await Category.update({
            category_name: name,
        }, {
            where: { category_id: id }
        });

        if (updated[0] === 0) {
            return "No category was updated";
        }

        return "Category updated successfully";
    } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Failed to update category');
    }
};

const deleteCategory = async (id) => {
    try {
        const category = await Category.findByPk(id);
        if (category) {
            await category.destroy();
            return "Category deleted successfully";
        }
        return "Category not found";
    } catch (error) {
        console.error('Error deleting category:', error);
        throw new Error('Failed to delete category');
    }
};

export default {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
