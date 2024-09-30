const productService = require("../services/productService"); 

const productController = {
 
  createProduct: async (req, res) => {
    try {
      const { name, price, quantity, categoryId } = req.body;

      if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
      }

      const product = await productService.createProduct(name, price, quantity, categoryId);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { productId } = req.params; 
      const product = await productService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params; 
      const { name, price, quantity, categoryId } = req.body;
      
      const [updatedCount] = await productService.updateProduct(
        productId,
        name,
        price,
        quantity,
        categoryId
      );
      
      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Product not found or no update needed' });
      }
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params; 
      const deleted = await productService.deleteProduct(productId);

      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController; 
