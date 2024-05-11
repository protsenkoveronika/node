const express = require("express");
const router = express.Router();
router.use(express.json());
var categoryController = require('../controllers/categoryController.js');

// Get all categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await categoryController.getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
});

// Get category by id
router.get('/:id', async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const category = await categoryController.getCategoryById(categoryId);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});

// Create a new category
router.post('/', async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const newCategory = await categoryController.createCategory(name, description);
        res.status(201).json(newCategory);
    } catch (err) {
        next(err);
    }
});

// Update a category
router.patch('/:id', async (req, res, next) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    try {
        const updatedCategory = await categoryController.updateCategory(categoryId, name, description);
        res.status(200).json(updatedCategory);
    } catch (err) {
        next(err);
    }
});

// Delete a category
router.delete('/:id', async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        await categoryController.deleteCategory(categoryId);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
