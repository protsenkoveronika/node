const express = require("express");
const router = express.Router();
router.use(express.json());
var categoryController = require('../controllers/categoryController.js');

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

module.exports = router;
