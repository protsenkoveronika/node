const express = require("express");
const router = express.Router();
router.use(express.json());
var categoryController = require('../controllers/categoryController.js');

// Get all categories
// router.get('/', async (req, res, next) => {
//     try {
//         const result = await categoryController.getAllCategories();
//         console.log('here')
//         res.render('news',{categories: result});
//         return res;
//     } catch (err) {
//         next(err);
//     }
// });

// router.get('/', async (req, res, next) => {
//     try {
//         const result = await categoryController.getAllCategories();
//         res.render('news', {title: 'Categories', categories: result });
//     } catch (err) {
//         next(err);
//     }
// });

router.get('/', async (req, res, next) => {
    try {
        const result = await categoryController.getAllCategories();
        res.render('categories', {title: 'Categories', categories: result });
    } catch (err) {
        next(err);
    }
});

// Get category by id
router.get('/:id', async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const category = await categoryController.getCategoryById(categoryId);
        // res.status(200).json(category);
        // res.render('categories', {title: 'Categories', categories: result });
        res.render('category', { title: `Category: ${category.title}`, category });
    } catch (err) {
        next(err);
    }
});

// Get category by title
router.get('/:title', async (req, res, next) => {
    const categoryTitle = req.params.title;
    try {
        const category = await categoryController.getCategoryByTitle(categoryTitle);
        // res.status(200).json(category);
        // res.render('categories', {title: 'Categories', categories: result });
        res.render('category', { title: `Category: ${category.title}`, category });
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
