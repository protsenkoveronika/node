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

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', [
  // Validate and sanitize input fields
  body('username').trim().isLength({ min: 3 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).render('signup', { errors: errors.array() });
  }

//   const { username, email, password } = req.body;

  try {
    // await userController.registerUser({ username, email, password });
    await userController.registerUser(req.body);
    res.redirect('/login');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
});

module.exports = router;

