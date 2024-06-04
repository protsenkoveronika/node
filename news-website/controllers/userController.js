const connection = require('../dbConfig');
const newsController = require('./newsController')
//
const { validationResult } = require('express-validator');


exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email } = req.body;

  try {
    const createdUserId = await db.createUser(username, password, email);

    req.session.userId = createdUserId;
    req.session.role = 'user';

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};
////

exports.createUser = async (userData) => {
  try {
    await connection.promise().beginTransaction();

    const [createResult] = await connection.promise().query('INSERT INTO users (username, email, userpassword, is_author) VALUES (?, ?, ?, ?)', userData);

    const createdUserId = createResult.insertId;

    await connection.promise().commit();

    return createdUserId;
  } catch (err) {
    await connection.promise().rollback();

    throw err;
  }
};

exports.readAllUsers = async () => {
  try {
    await connection.promise().beginTransaction();

    const [readResult] = await connection.promise().query('SELECT * FROM users');

    await connection.promise().commit();

    return readResult;

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};

exports.readUserById = async (userId) => {
  try {
    await connection.promise().beginTransaction();

    const [readResult] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    
    await connection.promise().commit();

    return readResult[0];

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};

exports.updateUser = async (userData, userId) => {
  try {
    await connection.promise().beginTransaction();

    await connection.promise().query('UPDATE users SET username = ?, email = ?, is_author = ? WHERE id = ?', [...userData, userId]);

    await connection.promise().commit();

    return userId;

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};

exports.updateUserAndCreateArticle = async (userData, userId, newsData) => {
  try {
    await connection.promise().beginTransaction();

    const updateResult = await connection.promise().query('UPDATE users SET username = ?, email = ?, userpassword = ?, is_author = ? WHERE id = ?', [...userData, true, userId]);
    
    if (newsData.content) {
      newsParams = [newsData.title, newsData.content, newsData.authorId] 
      await newsController.createNews(newsParams);
      
      
    } else {
      await connection.promise().rollback();
      console.log('Transaction rolled back because article content is missing');
      return null;
    }

    console.log('User updated and article created successfully');
    await connection.promise().commit();

    return userData.userId;
  } catch (err) {
    await connection.promise().rollback();
    console.error('Error occurred, transaction rolled back:', err);
    throw err;
  }
};


exports.deleteUser = async (userId) => {
  try {
    await connection.promise().beginTransaction();

    await connection.promise().query('UPDATE news SET author_id = NULL WHERE author_id = ?', [userId]);
    
    await connection.promise().query('DELETE FROM users WHERE id = ?', [userId]);

    await connection.promise().commit();

    return  userId;

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};
