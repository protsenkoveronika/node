const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController');

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoriesController.getAllCategories();
    res.render('index', { title: 'News Website', categories });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
