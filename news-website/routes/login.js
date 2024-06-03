const express = require("express");
const router = express.Router();
router.use(express.json());
const userController = require('../controllers/userController.js');
const categoriesController = require("../controllers/categoryController");

router.get('/', async (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        next(err);
    }
});

module.exports = router;