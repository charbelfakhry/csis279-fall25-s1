import Product from "../Models/Product";

const createProduct = async (name, price, quantity, categoryId) => {
    try {
        const newProduct = await Product.create({
            product_name: name,
            product_price: price,
            product_qty: quantity,
            category_id: categoryId,
        });

        return newProduct.toJSON();
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
};

const getAllProducts = async () => {
    try {
        const products = await Product.findAll();
        return products.map(product => product.toJSON());
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw new Error('Failed to retrieve products');
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (product) {
            return product.toJSON();
        }
        return "Product not found";
    } catch (error) {
        console.error('Error retrieving product by ID:', error);
        throw new Error('Failed to retrieve product');
    }
};

const updateProduct = async (id, name, price, quantity, categoryId) => {
    try {
        const updated = await Product.update({
            product_name: name,
            product_price: price,
            product_qty: quantity,
            category_id: categoryId,
        }, {
            where: { product_id: id }
        });

        if (updated[0] === 0) {
            return "No product was updated";
        }

        return "Product updated successfully";
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
};

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            return "Product deleted successfully";
        }
        return "Product not found";
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
    }
};

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
