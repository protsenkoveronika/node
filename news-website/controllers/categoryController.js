const connection = require('../dbConfig');

exports.createCategory = async (name, description) => {
    try {
        await connection.promise().beginTransaction();

        const [createResult] = await connection.promise().query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);

        const createdCategoryId = createResult.insertId;

        await connection.promise().commit();
        
        return createdCategoryId;
    } catch (err) {
        await connection.promise().rollback();
        throw err;
    }
};

exports.getAllCategories = async () => {
    try {
        await connection.promise().beginTransaction();

        const [readResult] = await connection.promise().query('SELECT * FROM categories');

        await connection.promise().commit();
        
        return readResult;

    } catch (err) {
        await connection.promise().rollback();
        throw err;
    }
};

exports.getCategoryById = async (categoryId) => {
    try {
        await connection.promise().beginTransaction();

        const [readResult] = await connection.promise().query('SELECT * FROM categories WHERE id = ?', [categoryId]);
        console.log("Query result:", readResult);
        await connection.promise().commit();

        return readResult[0];

    } catch (err) {
        await connection.promise().rollback();
        throw err;
    }
};

exports.getCategoryByTitle = async (categoryTitle) => {
    try {
        await connection.promise().beginTransaction();

        const [readResult] = await connection.promise().query('SELECT * FROM categories WHERE title = ?', [categoryTitle]);

        await connection.promise().commit();

        return readResult[0];

    } catch (err) {
        await connection.promise().rollback();
        throw err;
    }
};

exports.updateCategory = async (categoryId, name, description) => {
    try {
        await connection.promise().beginTransaction();

        await connection.promise().query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, categoryId]);

        await connection.promise().commit();

        return categoryId;

    } catch (err) {
        await connection.promise().rollback();
        throw err;
    }
};

exports.deleteCategory = async (categoryId) => {
    try {
        await connection.promise().beginTransaction();

        await connection.promise().query('DELETE FROM categories WHERE id = ?', [categoryId]);

        await connection.promise().commit();

        return categoryId;

    } catch (err) {
        await connection.promise().rollback();
        throw err;
    }
};
