// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
router.use(express.json());
var newsController = require('../controllers/userController.js'); 

//get user
router.get('/', async (req, res, next) => {
  try {
    const result = await newsController.readAllUsers();
    res.status(201).json({ message: 'User information read successfully'});
  } catch (err) {
    next(err);
  }
});

// get user by id
router.get('/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const result = await newsController.readUserById(userId);
    res.status(201).json({ message: 'User information read successfully', userId});
  } catch (err) {
    next(err);
  }
});

//create user
router.post('/', async (req, res, next) => {
  const { username, email, userpassword, is_author} = req.body;
  try {
    const userData = [username, email, userpassword, is_author];
    const result = await newsController.createUser(userData);
    res.status(201).json({ message: 'User created successfully', userid: result.createdUserId });
  } catch (err) {
    next(err);
  }
});

// update user
router.patch('/:id', async (req, res, next) => {
  const userid  = req.params.id;
  const { username, email, userpassword, is_author} = req.body;
  try {
    const userData = [username, email, userpassword, is_author];
    await newsController.updateUser(userData, userid);
    res.json({ message: 'User information1 updated successfully', userid});
  } catch (err) {
    next(err);
  }
});

// update with rollback
router.patch('/:id/rollback', async (req, res, next) => {
  const userId  = req.params.id;
  const { username, email, userpassword, is_author, title, content, authorId} = req.body;
  try {
    const userData = [username, email, userpassword, is_author];
    const newsData = {title, content, authorId};
    await newsController.updateUserAndCreateArticle(userData,userId, newsData);
    res.json({ message: 'User information and news updated successfully', userId});
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete('/:id', async (req, res, next) => {
  const userid  = req.params.id;
  try {
    await newsController.deleteUser(userid); 
    res.json({ message: 'User deleted successfully', userid});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
