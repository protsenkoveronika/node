const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const newsController = require("../controllers/newsController");

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryController.getAllCategories();
    res.render('index', { title: 'News Website', categories });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
