const connection = require('../dbConfig');
const newsController = require('./newsController')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [createResult] = await connection.promise().query('INSERT INTO users (username, email, userpassword, is_author) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, '0']);

    const createdUserId = createResult.insertId;

    req.session.user = {
      id: createdUserId,
      username: username,
      email: email,
      is_author: '0'
    };
    // console.log('User registered successfully with is_author:', req.session.user.is_author);
    // if (req.session.user.is_author == '0') {
    //   res.redirect('/');
    // } else {
    //   res.redirect('/adminUsers');
    // }
    res.redirect('/login');
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

    await connection.promise().query('UPDATE users SET username = ?, email = ?, userpassword = ?, is_author = ? WHERE id = ?', [...userData, userId]);

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

exports.authenticateUser = async (email, password) => {
  console.log(`Attempting to authenticate user with email: ${email}`);
  try {
    const [rows] = await connection.promise().execute('SELECT * FROM users WHERE email = ?', [email]); // Исправление на правильный вызов db.execute
    const user = rows[0];

    if (!user) {
      console.log('No user found with this email.');
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.userpassword);
    if (passwordMatch) {
      console.log('Password match. User authenticated successfully.');
      return user;
    } else {
      console.log('Password does not match.');
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    console.log(`Authentication failed: ${err.message}`);
    throw new Error('Database query failed');
  }
};