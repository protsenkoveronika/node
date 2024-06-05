const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware');

router.use(ensureAuthenticated);
router.use(ensureAdmin);

router.get('/adminUsers', (req, res) => {
    res.render('adminUsers');
});

router.get('/adminCategories', (req, res) => {
    res.render('adminCategories');
});

router.get('/adminNews', (req, res) => {
    res.render('adminNews');
});

module.exports = router;
