// const express = require("express");
// const router = express.Router();
// router.use(express.json());
// const userController = require('../controllers/userController.js');
//
// router.get('/', async (req, res, next) => {
//     try {
//         res.render('signup');
//     } catch (err) {
//         next(err);
//     }
// });
//
// module.exports = router;

const express = require("express");
const router = express.Router();
router.use(express.json());
const userController = require('../controllers/userController.js');
const { body } = require('express-validator');

router.get('/', async (req, res, next) => {
    try {
        res.render('signup');
    } catch (err) {
        next(err);
    }
});

router.post(
    '/',
    [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('email').isEmail().withMessage('Email is invalid')
    ],
    userController.register
);

module.exports = router;
