const express = require("express");
const router = express.Router();
router.use(express.json());
const categoryController = require('../controllers/categoryController.js');
const newsController = require("../controllers/newsController");

//get all categories
router.get('/categories', async (req, res, next) => {
    try {
        const result = await categoryController.getAllCategories();
        res.render('adminCategories', { categories: result });
    } catch (err) {
        next(err);
    }
});

//get all news
router.get('/news', async (req, res, next) => {
    try {
        const result = await newsController.readAllNews();
        res.render('adminNews', { news: result });
    } catch (err) {
        next(err);
    }
});

module.exports = router;