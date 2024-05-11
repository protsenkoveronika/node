var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root_root1991',
  database: 'news_website'
});

/*// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool
module.exports = pool.promise();*/


connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const insertQueryForUsers = 'INSERT IGNORE  INTO users (username, email, userpassword, is_author) VALUES (?, ?, ?, ?)';
const testDataUsers = [
  ['admin1', 'admin1@example.com', '1234', '1'],
  ['admin2', 'admin2@example.com', '4321', '1'],
  ['user1', 'user1@example.com', '1111', '0'],
  ['user2', 'user2@example.com', '2222', '0'],
];

const insertQueryForNews = 'INSERT IGNORE INTO news (title , content , author_id) VALUES (?, ?, ?)';
const testDataNews = [
  ['Title1', 'Content Content Content', '1'],
  ['Title2', 'Content from admin2', '2'],
];

testDataUsers.forEach(data => {
  const [username, email, userpassword] = data;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      connection.query(insertQueryForUsers, data, (err, result) => {
        if (err) throw err;
        console.log('Test data row for users inserted successfully');
      });
    } else {
      console.log('The test data row for users already exists');
    }
  });
});

testDataNews.forEach(data => {
  const [title, content, author_id] = data;
  connection.query('SELECT * FROM news WHERE title = ?', [title], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      connection.query(insertQueryForNews, data, (err, result) => {
        if (err) throw err;
        console.log('Test data row for news inserted successfully');
      });
    } else {
      console.log('The test data row for news already exists');
    }
  });
});

module.exports = connection;
