const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController.js');

router.use(express.json());

router.get('/page', async (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    console.log(`Received login request for email: ${email}`);

    try {
        const user = await userController.authenticateUser(email, password);
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            is_author: user.is_author
        };
        console.log('User authenticated and session established.');
        res.redirect('/');
    } catch (err) {
        console.log(`Authentication failed: ${err.message}`);
        res.status(401).render('login', { error: 'Invalid email or password' });
    }
});


module.exports = router;
