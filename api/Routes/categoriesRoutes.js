const router = express.Router();

const {
    getAllCategoriesController,
    getCategoryByIdController,
    createNewCategoryController,
    updateCategoryController,
    deleteCategoryController
} = require('../controllers/categoriesController');

// GET ROUTES
router.get('/categories', getAllCategoriesController);
router.get('/categories/:id', getCategoryByIdController);

// POST ROUTES
router.post('/categories', createNewCategoryController);

// PUT ROUTES
router.put('/categories/:id', updateCategoryController);

// DELETE ROUTES
router.delete('/categories/:id', deleteCategoryController);

module.exports = router;