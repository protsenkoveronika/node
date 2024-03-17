const connection = require('../dbConfig');

exports.createNews = async (newsData) => {
  try {
    await connection.promise().beginTransaction();

    const [createResult] = await connection.promise().query('INSERT INTO news (title, content, author_id) VALUES (?, ?, ?)', newsData);

    const createdNewsId = createResult.insertId;

    await connection.promise().commit();

    return createdNewsId;
  } catch (err) {
    await connection.promise().rollback();

    throw err;
  }
};

exports.readAllNews = async () => {
  try {
    await connection.promise().beginTransaction();

    const [readResult] = await connection.promise().query('SELECT * FROM news');

    await connection.promise().commit();

    return readResult;

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};

exports.readNewsById = async (newsId) => {
  try {
    await connection.promise().beginTransaction();

    const [readResult] = await connection.promise().query('SELECT * FROM news WHERE id = ?', [newsId]);

    await connection.promise().commit();

    return readResult[0];

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};

exports.updateNews = async (newsData, newsId) => {
  try {
    await connection.promise().beginTransaction();

    await connection.promise().query('UPDATE news SET title = ?, content = ?, author_id = ? WHERE id = ?', [...newsData, newsId]);

    await connection.promise().commit();

    return newsId;

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};

// exports.updateWithRollback = async (newsData, newsId) => {
//   try {
//     await connection.promise().beginTransaction();

//     await connection.promise().query('UPDATE news SET title = ?, content = ?, author_id = ? WHERE id = ?', [...newsData, newsId]);

//     console.log('News successfuly updated')

//     await connection.promise().rollback();

//     console.log('Transaction rolled back')

//     return newsId;
//   } catch (err) {
//     await connection.promise().rollback();

//     throw err;
//   }
// };

exports.deleteNews = async (newsId) => {
  try {
    await connection.promise().beginTransaction();

    await connection.promise().query('DELETE FROM news WHERE id = ?', [newsId]);

    await connection.promise().commit();

    return  newsId;

  } catch (err) {
    await connection.promise().rollback();
    throw err;
  }
};
