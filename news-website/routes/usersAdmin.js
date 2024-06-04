const express = require("express");
const router = express.Router();
router.use(express.json());
const userController = require('../controllers/userController.js');

//get users
router.get('/', async (req, res, next) => {
  try {
    const result = await userController.readAllUsers();
    res.render('adminUsers', { users: result });
  } catch (err) {
    next(err);
  }
});

// get user by id
router.get('/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const result = await userController.readUserById(userId);
    res.status(201).json({ message: 'User information read successfully', userId});
  } catch (err) {
    next(err);
  }
});

//create user
router.post('/create', async (req, res, next) => {
  const { username, email, userpassword, is_author} = req.body;
  try {
    const userData = [username, email, userpassword, is_author];
    const result = await userController.createUser(userData);
    res.status(201).json({ message: 'User created successfully', userid: result.createdUserId });
  } catch (err) {
    next(err);
  }
});

router.get('/updatePage/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const result = await userController.readUserById(userId);
    res.render('updateUser', { user: result });
  } catch (err) {
    next(err);
  }
});

// update user
router.post('/update/:id', async (req, res, next) => {
  const userid  = req.params.id;
  const { username, email, is_author} = req.body;
  try {
    const userData = [username, email, is_author];
    await userController.updateUser(userData, userid);
    const result = await userController.readAllUsers();
    res.render('adminUsers', { users: result });
  } catch (err) {
    next(err);
  }
});

// // update with rollback
// router.patch('/:id/rollback', async (req, res, next) => {
//   const userId  = req.params.id;
//   const { username, email, userpassword, is_author, title, content, authorId} = req.body;
//   try {
//     const userData = [username, email, userpassword, is_author];
//     const newsData = {title, content, authorId};
//     await userController.updateUserAndCreateArticle(userData,userId, newsData);
//     res.json({ message: 'User information and news updated successfully', userId});
//   } catch (err) {
//     next(err);
//   }
// });

// delete user
router.post('/delete/:id', async (req, res, next) => {
  const userid  = req.params.id;
  try {
    await userController.deleteUser(userid);
    const result = await userController.readAllUsers();
    res.render('adminUsers', { users: result });
    res.json({ message: 'User deleted successfully', userid});
  } catch (err) {
    next(err);
  }
});
// router.delete('/delete/:id', async (req, res, next) => {
//   const userid = req.params.id;
//   try {
//     await userController.deleteUser(userid);
//     const result = await userController.readAllUsers();
//     res.render('adminUsers', { users: result });
//     res.json({ message: 'User deleted successfully', userid });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
