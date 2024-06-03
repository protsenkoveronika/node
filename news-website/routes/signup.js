const express = require("express");
const router = express.Router();
router.use(express.json());
const userController = require('../controllers/userController.js');

router.get('/', async (req, res, next) => {
    try {
        res.render('signup');
    } catch (err) {
        next(err);
    }
});

module.exports = router;